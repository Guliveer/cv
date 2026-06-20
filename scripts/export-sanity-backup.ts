/**
 * One-time Sanity backup script.
 *
 * Exports all documents and asset images from Sanity into the repository so the
 * migration away from Sanity can proceed safely even if the remote project is
 * later disabled or deleted.
 *
 * Outputs:
 *   - .backup/sanity-export.json    raw document dump
 *   - website/public/content/...    downloaded binary assets (profile image, company logos)
 *
 * Run from repository root:
 *   npx -y tsx website/scripts/export-sanity-backup.ts
 *
 * This script is intentionally idempotent: re-running it overwrites the backup
 * file and re-downloads assets, but never mutates Sanity.
 */

import { createClient, type SanityClient } from "@sanity/client";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

import config from "../config.json" with { type: "json" };

// ---------- Configuration ---------------------------------------------------

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..", "..");
const BACKUP_JSON_PATH = join(REPO_ROOT, ".backup", "sanity-export.json");
const PUBLIC_CONTENT_DIR = join(REPO_ROOT, "website", "public", "content");
const COMPANIES_DIR = join(PUBLIC_CONTENT_DIR, "companies");

const DOCUMENT_TYPES = ["profile", "experience", "education", "project"] as const;
type DocumentType = (typeof DOCUMENT_TYPES)[number];

const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 500;

// ---------- Types -----------------------------------------------------------

interface SanityImageAsset {
    readonly _ref: string;
}

interface SanityImage {
    readonly asset?: SanityImageAsset;
}

interface SanityDocument {
    readonly _id: string;
    readonly _type: string;
    readonly _createdAt: string;
    readonly [key: string]: unknown;
}

interface BackupManifest {
    readonly exportedAt: string;
    readonly projectId: string;
    readonly dataset: string;
    readonly documents: Readonly<Record<DocumentType, readonly SanityDocument[]>>;
    readonly assets: readonly {
        readonly ref: string;
        readonly originalUrl: string;
        readonly localPath: string;
    }[];
}

// ---------- Helpers ---------------------------------------------------------

function slugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "untitled";
}

/**
 * Decodes a Sanity image asset reference (e.g. "image-abc123-128x128-svg")
 * into its CDN URL and file extension.
 */
function decodeAssetRef(ref: string, projectId: string, dataset: string): {
    url: string;
    extension: string;
} {
    const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
    if (!match) {
        throw new Error(`Unrecognised asset reference format: ${ref}`);
    }
    const [, hash, dimensions, extension] = match;
    const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dimensions}.${extension}`;
    return { url, extension };
}

async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt < MAX_RETRIES) {
                const delay = RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
                console.warn(`  ↻ ${label} failed (attempt ${attempt}/${MAX_RETRIES}), retrying in ${delay}ms...`);
                await new Promise(r => setTimeout(r, delay));
            }
        }
    }
    throw new Error(`${label} failed after ${MAX_RETRIES} attempts: ${String(lastError)}`);
}

/**
 * Atomically writes a file: stream to `.tmp` sibling, then rename.
 * Prevents half-written files on crash.
 */
async function atomicDownload(url: string, destination: string): Promise<void> {
    await mkdir(dirname(destination), { recursive: true });
    const tmpPath = `${destination}.tmp`;

    const response = await fetch(url);
    if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status} fetching ${url}`);
    }

    await pipeline(
        Readable.fromWeb(response.body as never),
        createWriteStream(tmpPath),
    );
    await rename(tmpPath, destination);
}

// ---------- Export logic ----------------------------------------------------

async function fetchAllDocuments(client: SanityClient): Promise<Record<DocumentType, SanityDocument[]>> {
    const result: Partial<Record<DocumentType, SanityDocument[]>> = {};

    for (const type of DOCUMENT_TYPES) {
        const query = `*[_type == $type]`;
        const docs = await withRetry(
            `fetch documents of type "${type}"`,
            () => client.fetch<SanityDocument[]>(query, { type }),
        );
        console.log(`  ✓ ${type}: ${docs.length} document(s)`);
        result[type] = docs;
    }

    return result as Record<DocumentType, SanityDocument[]>;
}

function collectImageRefs(
    documents: Record<DocumentType, SanityDocument[]>,
): { ref: string; filename: string; targetDir: string }[] {
    const refs: { ref: string; filename: string; targetDir: string }[] = [];
    const seen = new Set<string>();

    // Profile image: public/content/profile.<ext>
    for (const profile of documents.profile) {
        const image = profile.image as SanityImage | undefined;
        const assetRef = image?.asset?._ref;
        if (assetRef && !seen.has(assetRef)) {
            refs.push({ ref: assetRef, filename: "profile", targetDir: PUBLIC_CONTENT_DIR });
            seen.add(assetRef);
        }
    }

    // Company logos: public/content/companies/<company-slug>.<ext>
    for (const experience of documents.experience) {
        const logo = experience.companyLogo as SanityImage | undefined;
        const assetRef = logo?.asset?._ref;
        const company = experience.company as string | undefined;
        if (assetRef && company && !seen.has(assetRef)) {
            refs.push({ ref: assetRef, filename: slugify(company), targetDir: COMPANIES_DIR });
            seen.add(assetRef);
        }
    }

    return refs;
}

async function downloadAssets(
    refs: { ref: string; filename: string; targetDir: string }[],
    projectId: string,
    dataset: string,
): Promise<BackupManifest["assets"]> {
    const manifest: { ref: string; originalUrl: string; localPath: string }[] = [];

    for (const { ref, filename, targetDir } of refs) {
        const { url, extension } = decodeAssetRef(ref, projectId, dataset);
        const localFilename = `${filename}.${extension}`;
        const absolutePath = join(targetDir, localFilename);

        await withRetry(`download ${ref}`, () => atomicDownload(url, absolutePath));
        console.log(`  ✓ ${ref} → ${localFilename}`);

        // Store paths relative to public/ so content files can reference them as absolute URLs
        const publicPath = "/" + absolutePath
            .slice(join(REPO_ROOT, "website", "public").length + 1)
            .replace(/\\/g, "/");
        manifest.push({ ref, originalUrl: url, localPath: publicPath });
    }

    return manifest;
}

// ---------- Main ------------------------------------------------------------

async function main(): Promise<void> {
    const { projectId, dataset } = config.sanity;
    console.log(`→ Connecting to Sanity: projectId=${projectId}, dataset=${dataset}`);

    const client = createClient({
        projectId,
        dataset,
        apiVersion: "2025-04-19",
        useCdn: false, // fresh data for backup, not CDN-cached
    });

    console.log("\n→ Fetching documents...");
    const documents = await fetchAllDocuments(client);

    console.log("\n→ Collecting asset references...");
    const refs = collectImageRefs(documents);
    console.log(`  ${refs.length} unique asset(s) to download`);

    console.log("\n→ Downloading assets...");
    const assets = await downloadAssets(refs, projectId, dataset);

    console.log("\n→ Writing backup manifest...");
    await mkdir(dirname(BACKUP_JSON_PATH), { recursive: true });
    const manifest: BackupManifest = {
        exportedAt: new Date().toISOString(),
        projectId,
        dataset,
        documents,
        assets,
    };
    const tmpJson = `${BACKUP_JSON_PATH}.tmp`;
    await writeFile(tmpJson, JSON.stringify(manifest, null, 2), "utf8");
    await rename(tmpJson, BACKUP_JSON_PATH);
    console.log(`  ✓ ${BACKUP_JSON_PATH}`);

    console.log("\n✓ Backup complete.");
    console.log(`  Documents: ${Object.values(documents).reduce((sum, docs) => sum + docs.length, 0)}`);
    console.log(`  Assets:    ${assets.length}`);
}

main().catch(error => {
    console.error("\n✗ Backup failed:");
    console.error(error);
    process.exit(1);
});
