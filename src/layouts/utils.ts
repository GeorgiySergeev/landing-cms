/**
 * Shared utility functions for layouts
 */

export type Theme = 'arabic' | 'chinese' | 'german' | 'bengali' | 'default';
export type Country = 'ar' | 'cn' | 'de' | 'bd' | 'us' | 'uk' | string;
export type LanguageCode = 'ar' | 'zh' | 'de' | 'bn' | 'en' | string;
export type Direction = 'ltr' | 'rtl';

// Content type definitions
export type ContentType = 'news' | 'blog' | 'media' | 'adult';
export type NewsCategory =
  | 'general'
  | 'health'
  | 'finance'
  | 'politics'
  | 'technology'
  | 'science'
  | 'briefing'
  | 'bengali'
  | string;
export type BlogCategory =
  | 'standard'
  | 'longform'
  | 'photoEssay'
  | 'opinion'
  | 'review'
  | string;
export type MediaCategory =
  | 'video'
  | 'podcast'
  | 'liveCoverage'
  | 'interactive'
  | string;
export type AdultCategory = 'potency' | 'healthProduct' | 'dating' | string;

interface LangDirResult {
  lang: LanguageCode;
  dir: Direction;
}

/**
 * Determines language and direction based on theme name
 */
export function getLangAndDir(theme: Theme): LangDirResult {
  switch (theme) {
    case 'arabic':
      return { lang: 'ar', dir: 'rtl' };
    case 'chinese':
      return { lang: 'zh', dir: 'ltr' };
    case 'german':
      return { lang: 'de', dir: 'ltr' };
    case 'bengali':
      return { lang: 'bn', dir: 'ltr' };
    default:
      return { lang: 'en', dir: 'ltr' };
  }
}

/**
 * Maps country codes to theme names
 */
export function getThemeFromCountry(country: Country): Theme {
  const themeMap: Record<Country, Theme> = {
    ar: 'arabic',
    cn: 'chinese',
    de: 'german',
    bd: 'bengali',
    us: 'default',
    uk: 'default',
  };

  return themeMap[country] || 'default';
}

/**
 * Resolves the appropriate template path based on content type and category
 */
export function getTemplatePath(
  contentType: ContentType,
  category: NewsCategory | BlogCategory | MediaCategory | AdultCategory
): string {
  if (contentType === 'news') {
    switch (category) {
      case 'health':
        return 'templates/news/HealthNewsTemplate';
      case 'finance':
        return 'templates/news/FinanceNewsTemplate';
      case 'briefing':
        return 'templates/news/BriefingTemplate';
      case 'bengali':
        return 'templates/news/BengaliNewsTemplate';
      default:
        return 'templates/news/GeneralNewsTemplate';
    }
  } else if (contentType === 'blog') {
    switch (category) {
      case 'longform':
        return 'templates/blog/LongformTemplate';
      case 'photoEssay':
        return 'templates/blog/PhotoEssayTemplate';
      case 'opinion':
        return 'templates/blog/OpinionTemplate';
      case 'review':
        return 'templates/blog/ReviewTemplate';
      default:
        return 'templates/blog/StandardBlogTemplate';
    }
  } else if (contentType === 'media') {
    switch (category) {
      case 'podcast':
        return 'templates/media/PodcastTemplate';
      case 'liveCoverage':
        return 'templates/media/LiveCoverageTemplate';
      case 'interactive':
        return 'templates/media/InteractiveTemplate';
      default:
        return 'templates/media/VideoNewsTemplate';
    }
  } else if (contentType === 'adult') {
    // For adult content, always use the UniversalAdultLayout
    return 'UniversalAdultLayout';
  }

  // Fallback to general news template
  return 'templates/news/GeneralNewsTemplate';
}
