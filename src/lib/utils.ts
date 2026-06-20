import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import cfg from '../../config.json'

const cache: { [key: string]: { data: any; expiry: number } } = {};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function shortDate(date: string | Date, locale: string): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return parsedDate.toLocaleDateString(locale, { month: "2-digit", year: "numeric" })
}

export function calcDuration(startDate: string | Date, endDate: string | Date | "Present"): number {
    const parseDate = (date: string | Date): Date => {
        if (typeof date === "string") {
            const [month, year] = date.split("/").map(Number);
            return new Date(year, month - 1, 1); // Create a valid Date object
        }
        return new Date(date);
    };

    const start = parseDate(startDate);
    const end = endDate === "Present" ? new Date() : parseDate(endDate);

    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)) + 1;
}

async function fetchRepo(repoUrl: string) {
    if (!repoUrl || !repoUrl.match(/^(https?:\/\/)?github\.com\/([^/]+)\/([^/]+)(\/|$)/)) {
        throw new Error("Invalid or non-existent GitHub repository URL");
    }

    const match = repoUrl.match(/^(https?:\/\/)?github\.com\/([^/]+)\/([^/]+)(\/|$)/);
    const [_, __, owner, repo] = match!;
    const cacheKey = `${owner}/${repo}`;

    // Check if the data is in the cache and still valid
    if (cache[cacheKey] && cache[cacheKey].expiry > Date.now()) {
        return cache[cacheKey].data;
    }

    const repoUrlApi = `https://api.github.com/repos/${owner}/${repo}`;
    const repoResponse = await fetch(repoUrlApi);
    if (!repoResponse.ok) {
        throw new Error(`Failed to fetch repository data: ${repoResponse.statusText}`);
    }
    const repoData = await repoResponse.json();

    const languagesUrl = `https://api.github.com/repos/${owner}/${repo}/languages`;
    const languagesResponse = await fetch(languagesUrl);
    if (!languagesResponse.ok) {
        throw new Error(`Failed to fetch repository languages: ${languagesResponse.statusText}`);
    }
    const languagesData = await languagesResponse.json();

    const enrichedData = {
        ...repoData,
        languages: Object.keys(languagesData),
    };

    // Save the data in the cache
    cache[cacheKey] = {
        data: enrichedData,
        expiry: Date.now() + 10 * 60 * 1000, // 10 minutes in milliseconds
    };

    return enrichedData;
}

export async function enrichProjects(projects: any[], sortBy: string) {
    const enrichedProjects = await Promise.all(
        projects.map(async (project) => {
            if (project.github) {
                try {
                    const repoData = await fetchRepo(project.github);

                    // Fill in missing fields
                    project.description = project.description || repoData.description;
                    project.stars = repoData.stargazers_count;

                    // Process and sort languages
                    project.technologies = [
                        ...(project.technologies || []),
                        ...(repoData.languages || [])
                            .filter((language: string) => language && !cfg.technologyBlacklist.includes(language)),
                    ]
                        .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                        .sort(); // Sort alphabetically
                } catch (error) {
                    console.error(`Failed to fetch data for ${project.github}:`, error);
                }
            }
            return project;
        })
    );

    if (sortBy === 'stars') {
        return enrichedProjects.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    }
    if (sortBy === 'name') {
        return enrichedProjects.sort((a, b) => a.title.localeCompare(b.title));
    }

    return enrichedProjects;
}
