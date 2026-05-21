# Law Portfolio

A cinematic React + TypeScript portfolio for an LLB law student, built for a premium legal/law-firm feel with scroll-scrub image sequences, GSAP animation, Three.js atmosphere, Netlify Forms, and a liquid-glass footer.

## Live Project

This portfolio is designed for Lakshya Tyagi, an LLB candidate focused on legal research, contract drafting, corporate law, and litigation-ready communication.

## Features

- React 18 + TypeScript + Vite application
- GSAP + ScrollTrigger scroll animations
- Lenis smooth scrolling
- Three.js particle and wireframe visual layers
- Statue scroll-scrub hero animation
- Hammer/gavel scroll-scrub verdict section
- Responsive law education timeline
- Polished freelance/legal work cards
- Animated skills rings
- Netlify-ready contact form
- Downloadable resume PDF
- Custom client logo and profile photo
- Cinematic liquid-glass footer with video background

## Tech Stack

- React 18
- TypeScript
- Vite
- GSAP
- ScrollTrigger
- Lenis
- Three.js
- Motion for React
- Lucide React
- CSS Modules
- Netlify

## Folder Structure

```text
.
├── public/
│   └── assets/
│       ├── images/
│       │   ├── statue/
│       │   ├── hammer/
│       │   ├── client-photo.jpeg
│       │   └── logo-lt.jpeg
│       └── resume/
│           └── Lakshya_Tyagi_CV.pdf
├── src/
│   ├── components/
│   │   ├── Character/
│   │   ├── styles/
│   │   ├── About.tsx
│   │   ├── Career.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Landing.tsx
│   │   ├── MainContainer.tsx
│   │   ├── Navbar.tsx
│   │   ├── TechStack.tsx
│   │   ├── Verdict.tsx
│   │   └── Work.tsx
│   ├── context/
│   ├── data/
│   │   └── content.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── netlify.toml
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Asset Requirements

The scroll-scrub sections depend on numbered JPEG frames.

Hero statue frames:

```text
public/assets/images/statue/ezgif-frame-001.jpg
public/assets/images/statue/ezgif-frame-002.jpg
...
public/assets/images/statue/ezgif-frame-240.jpg
```

Verdict hammer frames:

```text
public/assets/images/hammer/ezgif-frame-001.jpg
public/assets/images/hammer/ezgif-frame-002.jpg
...
public/assets/images/hammer/ezgif-frame-050.jpg
```

Client assets:

```text
public/assets/images/client-photo.jpeg
public/assets/images/logo-lt.jpeg
public/assets/resume/Lakshya_Tyagi_CV.pdf
```

If you replace the statue sequence with a different frame count, update `STATUE_FRAME_COUNT` in:

```text
src/components/MainContainer.tsx
src/components/Character/StatueScrub.tsx
```

If you replace the hammer sequence with a different frame count, update `HAMMER_FRAME_COUNT` in:

```text
src/components/MainContainer.tsx
src/components/Character/HammerScrub.tsx
```

## Editing Client Content

All client-facing text and links live in one file:

```text
src/data/content.ts
```

Update this file to change:

- Client name
- Title
- Email
- LinkedIn URL
- Location
- Education
- Work/projects
- Skills
- Achievements
- Contact labels
- Resume/image paths

## Installation

Clone the repository:

```bash
git clone https://github.com/Abhi190702/Law-Portfolio.git
cd Law-Portfolio
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the local URL Vite prints, usually:

```text
http://127.0.0.1:5173
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The production files are generated in:

```text
dist/
```

## Deploying to Netlify

Option 1: Drag and drop

1. Run `npm run build`.
2. Open Netlify.
3. Drag the `dist/` folder into Netlify deploy.

Option 2: Connect GitHub

1. Push this repository to GitHub.
2. In Netlify, choose "Add new site" then "Import an existing project".
3. Select this GitHub repository.
4. Use these build settings:

```text
Build command: npm run build
Publish directory: dist
```

The included `netlify.toml` already contains the correct settings.

## Contact Form Setup

The contact form is configured for Netlify Forms.

After deploying:

1. Open your site in Netlify.
2. Go to Forms.
3. Confirm the `contact` form appears.
4. Go to Form notifications.
5. Add the email address that should receive submissions.

Without this notification setup, submissions will still be stored in Netlify, but you may not receive email alerts.

## Customizing for Another Law Student

To reuse this portfolio for another client:

1. Replace the client photo in `public/assets/images/client-photo.jpeg`.
2. Replace the logo in `public/assets/images/logo-lt.jpeg`.
3. Replace the resume in `public/assets/resume/Lakshya_Tyagi_CV.pdf`.
4. Edit `src/data/content.ts`.
5. Replace statue and hammer frames if needed.
6. Run `npm run build`.
7. Deploy the new `dist/` folder.

## GitHub Commit Workflow

Check changed files:

```bash
git status
```

Stage all project files:

```bash
git add .
```

Commit the website:

```bash
git commit -m "Build React law portfolio website"
```

Push to GitHub:

```bash
git push origin main
```

## Notes

- Do not commit `node_modules/`.
- Do not commit `dist/` unless you intentionally want built files in the repository.
- Keep large frame sequences in `public/assets/images/` so Vite can serve them directly.
- If animations feel stale after replacing frames, update the asset version string in `MainContainer.tsx` and the related scrub component.

## License

This repository currently includes the original project license file. Review it before commercial redistribution.
