# Holy Quran - Project Guide

## Project Overview

A modern web application for reading and exploring the Holy Quran, built with React 19, TypeScript, Vite, Tailwind CSS v4, and shadcn/ui. The app fetches Quran data from the Al Quran Cloud API (`https://api.alquran.cloud/v1/`).

## Tech Stack

- **Framework:** React 19 + TypeScript 5.9
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4 + shadcn/ui (new-york style)
- **Routing:** React Router DOM v7
- **API:** Al Quran Cloud API (https://alquran.cloud/api)
- **Fonts:** Inter (UI), Amiri (Arabic Quranic text)

## Commands

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Type-check + production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── assets/            # Static assets (images, icons, SVGs)
├── components/
│   ├── layout/        # Header, Footer, RootLayout
│   ├── quran/         # Quran-specific components (verse cards, surah headers, etc.)
│   └── ui/            # shadcn/ui components (auto-generated, do not edit manually)
├── context/           # React context providers (theme, etc.)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions (cn helper, API helpers)
├── pages/             # Route-level page components
└── types/             # TypeScript type definitions
```

## Architecture Guidelines

### Component Conventions
- Use named exports for all components (except `App` which uses default export)
- Page components live in `src/pages/` and map 1:1 to routes
- Shared UI goes in `src/components/`; domain-specific components in `src/components/quran/`
- shadcn/ui components in `src/components/ui/` are managed by the CLI - do not manually edit them

### Styling
- Use Tailwind utility classes exclusively; avoid custom CSS except in `index.css` for theme variables
- The app uses a custom Islamic-themed color palette: deep green primary, gold accent
- Arabic text uses the `font-arabic` utility class and should always have `dir="rtl"` and `lang="ar"`
- Dark mode is class-based (`.dark` on `<html>`), managed by `ThemeProvider`

### API Usage
- All Quran data is fetched from `https://api.alquran.cloud/v1/`
- Key endpoints:
  - `GET /surah` - List all 114 surahs
  - `GET /surah/{number}` - Get full surah with ayahs
  - `GET /surah/{number}/{edition}` - Get surah in specific edition/translation
  - `GET /ayah/{reference}` - Get specific ayah
  - `GET /search/{query}/{surah}/{edition}` - Search verses

### TypeScript
- Strict mode is enabled
- All types go in `src/types/`
- Use `interface` for object shapes, `type` for unions/intersections
- Import types with `import type` when possible

### Path Aliases
- `@/*` maps to `src/*` (configured in both tsconfig and Vite)
- Always use `@/` imports for project files

### RTL & Accessibility
- Arabic Quranic text must always include `dir="rtl"` and `lang="ar"` attributes
- Maintain proper heading hierarchy (h1 > h2 > h3)
- All interactive elements must be keyboard accessible
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, etc.)

### State Management
- Use React Context for global state (theme, settings)
- Use local `useState`/`useReducer` for component state
- Keep data fetching in page components; pass data down as props

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Components are installed to `src/components/ui/`. Browse available components at https://ui.shadcn.com/docs/components.

## Color Theme Reference

| Token     | Light                  | Dark                   |
|-----------|------------------------|------------------------|
| Primary   | Deep green `hsl(152 69% 22%)` | Green `hsl(152 60% 40%)` |
| Accent    | Gold `hsl(45 93% 47%)`       | Gold `hsl(45 90% 50%)`   |
| Background| Warm white `hsl(40 33% 98%)`  | Deep navy `hsl(220 20% 7%)` |

## Git Workflow

- Feature branches: `claude/<feature-description>-<id>`
- Commit messages: descriptive, imperative mood
- Always run `npm run build` before pushing to verify no type errors
