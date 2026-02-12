# GameX Portal

A personalized, production-ready Next.js portal for a game studio.

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4

## Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build and export static site

```bash
npm run build
```

The static output is generated in the `out/` directory.

## Project structure

- `app/page.tsx` - main portal landing page
- `app/layout.tsx` - metadata and global layout shell
- `app/globals.css` - global theme tokens and base styles
- `public/` - static assets used by the site
