/**
 * Resolves the appropriate layout based on content type, category, and locale settings
 */
import type {
  AdultCategory,
  BlogCategory,
  ContentType,
  Country,
  MediaCategory,
  NewsCategory,
  Theme,
} from './utils';
import { getTemplatePath, getThemeFromCountry } from './utils';

interface LayoutResult {
  Component: any; // Using 'any' here because Astro components don't have a specific TypeScript type
  theme: Theme;
}

// Use import.meta.glob to statically import all possible layouts and templates
const localeLayouts = import.meta.glob('./locale/*/*.astro');
const baseLayouts = import.meta.glob('./base/*.astro');
const templateLayouts = import.meta.glob('./templates/**/*.astro');

/**
 * Legacy layout resolver for backward compatibility
 */
export async function getLayout(
  layoutName: string,
  country: Country,
  language: string
): Promise<LayoutResult> {
  const theme = getThemeFromCountry(country);

  // Special case for UniversalAdultLayout (base layout)
  if (layoutName === 'UniversalAdultLayout') {
    const mod = await baseLayouts['./base/UniversalAdultLayout.astro']();
    return { Component: (mod as any).default, theme };
  }

  // Special case for LendLayout (base layout)
  if (layoutName === 'LendLayout') {
    const mod = await baseLayouts['./base/LendLayout.astro']();
    return { Component: (mod as any).default, theme };
  }

  // Special case for NewsLayout - now it's a template, redirect to appropriate base layout
  if (layoutName === 'NewsLayout') {
    // For NewsLayout, use BaseLayout as the base and let templates handle composition
    const mod = await baseLayouts['./base/BaseLayout.astro']();
    return { Component: (mod as any).default, theme };
  }

  // Try to load locale-specific layout
  if (theme !== 'default') {
    const localeKey = `./locale/${theme}/${layoutName}.astro`;
    if (localeLayouts[localeKey]) {
      const mod = await localeLayouts[localeKey]!();
      return { Component: (mod as any).default, theme };
    }
  }

  // Try to load from templates
  // Support both one-level and two-level template directories
  const templateKey1 = `./templates/${layoutName}.astro`;
  const templateKey2 = `./templates/${theme}/${layoutName}.astro`;
  const templateKey3 = `./templates/news/${layoutName}.astro`; // For news templates

  if (templateLayouts[templateKey1]) {
    const mod = await templateLayouts[templateKey1]!();
    return { Component: (mod as any).default, theme };
  }
  if (templateLayouts[templateKey2]) {
    const mod = await templateLayouts[templateKey2]!();
    return { Component: (mod as any).default, theme };
  }
  if (templateLayouts[templateKey3]) {
    const mod = await templateLayouts[templateKey3]!();
    return { Component: (mod as any).default, theme };
  }

  // Fallback to base layout
  const baseKey = `./base/${layoutName}.astro`;
  if (baseLayouts[baseKey]) {
    const mod = await baseLayouts[baseKey]!();
    return { Component: (mod as any).default, theme };
  }

  throw new Error(`Layout not found: ${layoutName} (theme: ${theme})`);
}

/**
 * New content-type based layout resolver
 * Uses the content type and category to determine the appropriate template
 */
export async function getContentLayout(
  contentType: ContentType,
  category: NewsCategory | BlogCategory | MediaCategory | AdultCategory,
  country: Country,
  options: {
    useLocalization?: boolean;
    language?: string;
    customTemplatePath?: string; // Add support for custom template path
    isAdult?: boolean; // Flag for adult content
  } = {}
): Promise<LayoutResult> {
  const {
    useLocalization = true,
    language = 'en',
    customTemplatePath,
    isAdult = false,
  } = options;
  const theme = getThemeFromCountry(country);

  // Special case for adult content type or isAdult flag - use the universal adult layout
  if (contentType === 'adult' || isAdult) {
    try {
      const adultLayout = await import('./base/UniversalAdultLayout.astro');
      return { Component: adultLayout.default, theme };
    } catch (error) {
      console.error(
        'Failed to load UniversalAdultLayout, falling back to standard resolution',
        error
      );
      // If adult layout loading fails, fall through to standard resolution
    }
  }

  // If a custom template path is provided, use it first
  if (customTemplatePath) {
    try {
      // Ensure the path has the .astro extension
      const fullPath = customTemplatePath.endsWith('.astro')
        ? `..${customTemplatePath}`
        : `..${customTemplatePath}.astro`;

      const customLayout = await import(fullPath);
      return { Component: customLayout.default, theme };
    } catch (error) {
      console.error(
        `Custom template at ${customTemplatePath} not found!`,
        error
      );
      // If custom template loading fails, fall through to standard resolution
    }
  }

  // Get the template path based on content type and category
  const templatePath = getTemplatePath(contentType, category);

  // Ensure the templatePath has the .astro extension
  const normalizedTemplatePath = templatePath.endsWith('.astro')
    ? templatePath
    : `${templatePath}.astro`;

  // Try to load locale-specific template if localization is enabled
  if (useLocalization && theme !== 'default') {
    try {
      const localeKey = `./locale/${theme}/${normalizedTemplatePath}`;
      if (localeLayouts[localeKey]) {
        const mod = await localeLayouts[localeKey]!();
        return { Component: (mod as any).default, theme };
      }
    } catch (error) {
      // If locale-specific template doesn't exist, continue to base template
      console.log(
        `No locale-specific template found for ${normalizedTemplatePath} and theme ${theme}. Using base template.`
      );
    }
  }

  // Load the template using import.meta.glob
  const templateKey = `./${normalizedTemplatePath}`;
  if (templateLayouts[templateKey]) {
    const mod = await templateLayouts[templateKey]!();
    return { Component: (mod as any).default, theme };
  }

  // Fallback to a basic content layout based on content type
  console.error(`Template ${normalizedTemplatePath} not found!`);
  const fallbackName = `${contentType.charAt(0).toUpperCase() + contentType.slice(1)}Layout.astro`;
  const fallbackKey = `./base/${fallbackName}`;

  if (baseLayouts[fallbackKey]) {
    const mod = await baseLayouts[fallbackKey]!();
    return { Component: (mod as any).default, theme };
  }

  throw new Error(
    `Layout not found: ${normalizedTemplatePath} and fallback ${fallbackKey} do not exist.`
  );
}
