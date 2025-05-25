# Vibe Astro Landings v3

A system for generating optimized and isolated landing pages using Astro, tailored for different countries, languages, and content variants.

## Overview

This project provides a framework for creating landing pages that are:

- **Isolated**: Each landing page can be built as a standalone package
- **Localized**: Support for multiple countries and languages
- **Themeable**: Different layouts based on region and language
- **Optimized**: Small file sizes for fast loading
- **Configurable**: Easy to add new landing page variants

## Project Structure

```
├── src/
│   ├── content/       # MDX content organized by country/language
│   ├── layouts/
│   │   ├── base/      # Base layout components
│   │   ├── locale/    # Country/language-specific layout overrides
│   │   └── getLayout.js # Layout resolution system
│   ├── pages/
│   │   ├── index.astro # System dashboard
│   │   └── landing/[layout]/[country]/[language]/[article]/[variant]/
│   │       └── index.astro # Dynamic route for landing pages
│   └── landings.js    # Configuration for all landing pages
├── scripts/
│   └── build-isolated.js # Script for creating isolated packages
└── dist-isolated/    # Output for isolated landing page builds
```

## Landing Pages Configuration

Landing pages are configured in `src/landings.js` with the following structure:

```js
{
  country: 'us',       // Country code
  language: 'en',      // Language code
  article: 'article1', // Content identifier
  variant: 'a',        // Variant identifier
  layout: 'BaseLayout',   // Layout component to use
  contentPath: '/us/en/article1/a.mdx' // Path to MDX content
}
```

## Layouts System

The system uses a flexible layout architecture:

1. **Base Layouts**: Common layout components (`BaseLayout`) in `src/layouts/base/`
2. **Theme Detection**: Automatic theme selection based on country code
3. **Locale Overrides**: Country/language-specific layout variations
4. **Layout Resolution**: The `getLayout.js` utility handles finding the right layout for each landing page

## Building & Development

### Development Server

```bash
npm run dev
```

Visit the dashboard at `http://localhost:3000` to see all available landing pages.

### Standard Build

```bash
npm run build
```

Creates a complete build with all landing pages in the `dist` directory.

### Isolated Builds

```bash
npm run build:isolated
```

Creates standalone packages for each landing page:

1. Each landing page is copied to `dist-isolated/{country}-{language}-{article}-{variant}/`
2. All required assets (CSS, JS, images) are included
3. Path references are updated to be relative
4. A ZIP file is created for each landing page
5. File size is calculated and reported (with warnings if over 100KB)

## Adding New Landing Pages

1. Add the landing page configuration to `src/landings.js`
2. Create the corresponding MDX content in `src/content/`
3. Run `npm run build:isolated` to generate the isolated build

## Themes and Localization

The system supports different themes based on region:

- Default theme: Used for `us`, `uk`
- Arabic theme: Used for `ar` (with RTL support)
- Chinese theme: Used for `cn`
- German theme: Used for `de`

Language and text direction are automatically set based on these themes.

## Technologies Used

- [Astro](https://astro.build/)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Preact](https://preactjs.com/)
