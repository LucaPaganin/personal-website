# Luca Paganin - Personal Website

A modern, multilingual personal website built with Next.js, featuring responsive design, internationalization, and dark mode support.

## Features

- **Multilingual Support**: Native support for English and Italian with a language selector
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly layout that adapts to any screen size
- **Interactive Components**: 
  - Photo carousel in the About Me section
  - Dynamic timeline for Experiences and Education
  - Skill visualization in the Tech Stack section
  - Modern card layouts for Projects, Publications, and Certifications

## Tech Stack

- **Next.js 14**: Modern React framework with App Router for improved routing and server components
- **TypeScript**: For type-safe code and improved developer experience
- **Tailwind CSS & DaisyUI**: For styling and UI components
- **next-intl**: For internationalization
- **Framer Motion**: For smooth animations and transitions
- **React Vertical Timeline**: For interactive timeline components
- **React Slick**: For the photo carousel
- **React Markdown**: For rendering markdown content

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LucaPaganin/personal-website.git
   cd personal-website/nextjs-personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
nextjs-personal-website/
├── public/                  # Static assets like images
├── src/
│   ├── app/                 # App Router pages
│   │   ├── [locale]/        # Localized routes
│   │   │   ├── about/       # About Me page
│   │   │   ├── projects/    # Projects page
│   │   │   └── cv/          # CV section with subpages
│   ├── components/          # Reusable UI components
│   ├── data/                # Content data (JSON and Markdown)
│   ├── messages/            # Internationalization messages
│   └── i18n.ts             # i18n configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies
```

## Customization

### Adding a New Language

1. Create a new JSON file in `src/messages/` for your language (e.g., `fr.json`)
2. Add the language code to the `locales` array in `src/i18n.ts`
3. Add translations for all keys in the new JSON file

### Content Management

- **Personal Data**: Update files in `src/data/json/` to modify your personal information, projects, experience, etc.
- **Markdown Content**: Update files in `src/data/md/` to modify longer-form content like the About Me page or detailed descriptions

### Theme Customization

Modify the theme colors in `tailwind.config.js` under the `daisyui.themes` section.

## Deployment

### Building for Production

```bash
npm run build
```

This will create an optimized production build in the `.next` folder.

### Deploying to Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com/), the platform from the creators of Next.js:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel
3. Vercel will detect it's a Next.js app and configure the build settings automatically

### Other Hosting Options

You can deploy this app to any hosting provider that supports Node.js applications:

- **Static Export**: For static hosting (GitHub Pages, Netlify)
  ```bash
  npm run build && npm run export
  ```

- **Server Deployment**: For servers with Node.js support (AWS, DigitalOcean)
  ```bash
  npm run build
  npm run start
  ```

## Adding New Content

### Projects

To add a new project:
1. Open `src/data/json/projects.json`
2. Add a new project entry with: name, description, github_link, technologies, and demo_link (if available)

### Experiences & Education

To add new experiences or education entries:
1. Open the relevant JSON file (`experience.json` or `phd_details.json`)
2. Add a new entry with all required fields
3. If you want detailed descriptions, create new markdown files in both languages in `src/data/md/`

### Publications & Certifications

Follow the same pattern as above, updating the corresponding JSON files in the `src/data/json/` directory.

## License

This project is licensed under the MIT License.

---

Created by Luca Paganin
