# Prettier Configuration

This project is configured for automatic code formatting using Prettier.

## Installed packages

- `prettier` - main code formatter
- `prettier-plugin-tailwindcss` - plugin for sorting Tailwind CSS classes
- `prettier-plugin-astro` - plugin for formatting Astro files

## Configuration

### .prettierrc
Main formatting settings:
- Use semicolons
- Single quotes
- Print width: 80 characters
- Tab width: 2 spaces
- ES5 trailing commas
- Automatic Tailwind class sorting

### .prettierignore
Excluded files and folders:
- `node_modules/`
- `dist/` and `dist-isolated/`
- `.astro/`
- IDE folders (`.vscode/`, `.idea/`, etc.)
- Package manager lock files
- `src/layouts/base/BaseLayout.astro` (due to special syntax)

## Commands

### Format all files
```bash
npm run format
```

### Check formatting without changes
```bash
npm run format:check
```

## VS Code integration

### Recommended extensions
- `esbenp.prettier-vscode` - Prettier formatter
- `astro-build.astro-vscode` - Astro support
- `bradlc.vscode-tailwindcss` - Tailwind CSS IntelliSense

### Automatic settings
- Format on save enabled
- Format on paste enabled
- Prettier set as default formatter for all supported file types

## Supported file types

- JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`)
- Astro files (`.astro`)
- CSS files (`.css`)
- JSON files (`.json`)
- Markdown files (`.md`, `.mdx`)

## Features

### Tailwind CSS
Tailwind classes are automatically sorted in the correct order thanks to the `prettier-plugin-tailwindcss` plugin.

### Astro files
Astro components are formatted with respect to their specific syntax thanks to the `prettier-plugin-astro` plugin.

### MDX files
MDX files have an increased line width (120 characters) and preserve line breaks in prose.

## Troubleshooting

If prettier is not working in VS Code:
1. Make sure the `esbenp.prettier-vscode` extension is installed
2. Check that prettier is installed locally: `npm list prettier`
3. Reload VS Code
4. Check settings in `.vscode/settings.json`

If there are conflicts with other formatters:
1. Disable other formatters for specific file types
2. Make sure prettier is set as the default formatter 