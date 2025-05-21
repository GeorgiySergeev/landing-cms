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

/**
 * Legacy layout resolver for backward compatibility
 */
export async function getLayout(
  layoutName: string,
  country: Country,
  language: string,
): Promise<LayoutResult> {
  // Determine which theme to use based on country code
  const theme = getThemeFromCountry(country);
  // Special case for UniversalAdultLayout
  if (layoutName === 'UniversalAdultLayout') {
    try {
      const universalLayout = await import('./base/UniversalAdultLayout.astro');
      return { Component: universalLayout.default, theme };
    } catch (e) {
      console.log('Failed to load UniversalAdultLayout, falling back to base layout');
    }
  }

  // Try to load locale-specific layout
  try {
    // Attempt to load a locale-specific layout based on theme
    if (theme !== 'default') {
      try {
        const localeLayout = await import(`./locale/${theme}/${layoutName}.astro`);
        return { Component: localeLayout.default, theme };
      } catch (e) {
        // Specific layout doesn't exist, fall through to base layout
      }
    }
  } catch (error) {
    // If locale-specific layout doesn't exist, continue to base layout
    console.log(
      `No locale-specific layout found for ${layoutName} and theme ${theme}. Using base layout.`,
    );
  }

  const baseLayout = await import(`./base/${layoutName}.astro`);
  return { Component: baseLayout.default, theme };
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
  } = {},
): Promise<LayoutResult> {
  const { useLocalization = true, language = 'en', customTemplatePath, isAdult = false } = options;
  const theme = getThemeFromCountry(country);
  // Special case for adult content type or isAdult flag - use the universal adult layout
  if (contentType === 'adult' || isAdult) {
    try {
      const adultLayout = await import('./base/UniversalAdultLayout.astro');
      return { Component: adultLayout.default, theme };
    } catch (error) {
      console.error(
        'Failed to load UniversalAdultLayout, falling back to standard resolution',
        error,
      );
      // If adult layout loading fails, fall through to standard resolution
    }
  }

  // If a custom template path is provided, use it first
  if (customTemplatePath) {
    try {
      const customLayout = await import(`..${customTemplatePath}`);
      return { Component: customLayout.default, theme };
    } catch (error) {
      console.error(`Custom template at ${customTemplatePath} not found!`, error);
      // If custom template loading fails, fall through to standard resolution
    }
  }

  // Get the template path based on content type and category
  const templatePath = getTemplatePath(contentType, category);

  // Try to load locale-specific template if localization is enabled
  if (useLocalization && theme !== 'default') {
    try {
      const localeTemplate = await import(`./locale/${theme}/${templatePath}.astro`);
      return { Component: localeTemplate.default, theme };
    } catch (error) {
      // If locale-specific template doesn't exist, continue to base template
      console.log(
        `No locale-specific template found for ${templatePath} and theme ${theme}. Using base template.`,
      );
    }
  }

  // Load the base template
  try {
    const baseTemplate = await import(`./${templatePath}.astro`);
    return { Component: baseTemplate.default, theme };
  } catch (error) {
    console.error(`Template ${templatePath} not found!`, error);

    // Fallback to a basic content layout based on content type
    const fallbackPath = `content/${
      contentType.charAt(0).toUpperCase() + contentType.slice(1)
    }Layout`;
    const fallbackLayout = await import(`./${fallbackPath}.astro`);
    return { Component: fallbackLayout.default, theme };
  }
}
