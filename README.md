# Dynamic CV

This project is a scalable CV/Resume application built with **Next.js**, **Sanity**, **Tailwind CSS**, and **shadcn/ui**.
It allows users to dynamically and easily generate a CV with customizable themes, fonts, and content.

---

## Features
- **Customizable Theme**: Easily modify colors, fonts, and styles.
- **Sanity Integration**: Fetches data dynamically from a Sanity dataset.
- **Responsive Design**: Optimized for all devices.
- **Print-Ready**: Includes styles for printing the CV.

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Guliveer/cv.git
cd cv
```

### 2. Install Dependencies
Run the following command to install all required dependencies:
```bash
cd website
npm install --legacy-peer-deps
```

### 3. Set Up Sanity

1. **Install Sanity CLI**:
   ```bash
   npm install -g @sanity/cli
   ```

2. **Create Sanity Studio**:
   - Visit [Sanity](https://www.sanity.io/) and create a new project
   - Copy the project ID and dataset name.

3. **Update Configuration**:
    - Open [sanity/config.ts](./sanity/config.ts) and [website/config.json](./website/config.json).
    - Replace the `projectId` and `dataset` values with your Sanity project details:
      ```typescript
      export const config = {
        projectId: "your-project-id",
        dataset: "your-dataset-name"
      }
      ```
4. **Further configuration**:
   - In [website/config.json](./website/config.json) you can also edit fields like:
     - `technologyBlacklist` to exclude specific technologies from being displayed.
     - `showStargazersCount` to show or hide the stargazers count on GitHub repo.
     - `sortProjects` ("name", "stars") to sort projects by ***name*** or ***Stargazers count*** (if enabled).

4. **Deploy Sanity Studio**:
   ```bash
   sanity deploy
   ```

### 4. Start the Development Server
Navigate back to the [website](./website) directory and start the server:
```bash
cd ../website
npm run dev
```
(You can run Sanity Studio locally by running the same command in the [sanity](./sanity) directory)

The application will be available by default at `http://localhost:3000`.

---

## Deployment (Vercel)

### 1. **Create new Vercel Project**:
Go to [Vercel](https://vercel.com/) and create a new project.

### 2. **Connect to GitHub**:
Connect your GitHub account and select the repository with your CV project.

### 3. **Select directory**:
Choose the `website/` directory as the root for your project.

### 4. **Dependencies installation**:
Vercel will automatically detect the dependencies from your `package.json` file.
However, you may need to override the default command
and add the `--legacy-peer-deps` flag to the build command to avoid dependency issues:
```bash
npm install --legacy-peer-deps
```

---

## Customization

### 1. **Edit Theme**
Modify the theme colors in [website/src/styles/theme.css](./website/src/styles/theme.css)  
To do so, you can visit one of the listed websites in that file to generate a color palette.

### 2. **Change Fonts**
Update the `fontFamily` in [website/tailwind.config.ts](./website/tailwind.config.ts)  
I recommend using [realtimecolors.com](https://real-time-colors.com/) for that purpose.
```typescript
fontFamily: {
    heading: 'Your Custom Font For Headings',
    body: 'Your Custom Font For Everything Else',
}
```
Ensure the font is imported in [theme.css](./website/src/styles/theme.css):
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

### 3. **Modify Content**
Update the content fetched from Sanity by visiting your Studio

---

Made with ❤️ by [Oliwer Pawelski](https://github.com/Guliveer)