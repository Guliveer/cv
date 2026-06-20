![Next.js Badge](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=for-the-badge)
![shadcn/ui Badge](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge)
![Vercel Badge](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge)

# CV

A personal CV website built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**.
All content is stored in a single `src/data/cv.json` file — edit it directly in GitHub's web editor from any device, including mobile.

---

## Features

- **JSON-based content**: No CMS, no account, no deploy step — just edit `cv.json` and push.
- **GitHub Projects integration**: Star counts and languages are fetched automatically from GitHub API.
- **Print / PDF**: Dedicated `/print` route with a clean A4-optimized layout, isolated from the main app styles.
- **Dark mode**: System-aware theme with manual toggle.
- **Responsive**: Optimized for all screen sizes.

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Guliveer/cv.git
cd cv
npm install
```

### 2. Edit your CV

Open `src/data/cv.json` and fill in your data. The structure is:

```json
{
  "profile": { "name", "email", "birthday", "location", "bio", "image", "links", "languages", "skills" },
  "experience": [{ "company", "url", "companyLogo", "position", "startDate", "endDate", "description", "formerlyKnownAs?" }],
  "education":  [{ "school", "degree", "field", "startDate", "endDate", "description" }],
  "projects":   [{ "title", "description", "github", "technologies" }]
}
```

Dates use `YYYY-MM-DD` or `YYYY-MM` format. Set `endDate` to `null` for current positions.

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Configuration

Edit `config.json` in the root to control:

| Key | Description |
|-----|-------------|
| `technologyBlacklist` | Technologies to exclude from GitHub language auto-detection |
| `showStargazersCount` | Show/hide star count on project cards |
| `sortProjects` | Sort projects by `"name"` or `"stars"` |

---

## Customization

### Theme colors

Edit the CSS variables in `src/styles/globals.css`. Use [ui.jln.dev](https://ui.jln.dev) or [realtimecolors.com](https://www.realtimecolors.com) to generate a palette.

### Fonts

Update `fontFamily` in `tailwind.config.ts` and the Google Fonts import in `src/styles/globals.css`:

```typescript
fontFamily: {
    heading: ['"Your Heading Font"', 'sans-serif'],
    body: ['Your Body Font', 'sans-serif'],
}
```

---

## Deployment (Vercel)

1. Push to GitHub and create a new Vercel project connected to the repository.
2. Set **Root Directory** to `.` (repo root).
3. No environment variables required.

---

Made with ❤️ by [Oliwer Pawelski](https://github.com/Guliveer)
