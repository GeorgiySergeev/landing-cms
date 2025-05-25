/**
 * Internationalization utilities for multi-language support
 */

/**
 * RTL (Right-to-Left) language codes
 * This includes Arabic, Hebrew, Persian, Urdu, etc.
 */
const RTL_LANGS = [
  'ar', // Arabic
  'he', // Hebrew
  'fa', // Persian (Farsi)
  'ur', // Urdu
  'dv', // Divehi
  'ha', // Hausa
  'ku', // Kurdish (Sorani)
  'ps', // Pashto
  'sd', // Sindhi
  'ug', // Uyghur
  'yi', // Yiddish
];

/**
 * Determines the reading direction based on language code
 * @param {string} lang - The language code (e.g., 'en', 'ar')
 * @returns {string} - Returns 'rtl' for right-to-left languages, otherwise 'ltr'
 */
export function getLangDirection(lang) {
  if (!lang) return 'ltr';

  // Handle cases with country code (e.g., 'ar-EG')
  const baseLang = lang.split('-')[0].toLowerCase();

  return RTL_LANGS.includes(baseLang) ? 'rtl' : 'ltr';
}

/**
 * Returns the appropriate date format based on locale
 * @param {Date|string} date - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} - The formatted date string
 */
export function formatDate(date, locale = 'en-US') {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  try {
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    // Fallback if the locale is not supported
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

/**
 * Translates a category name to the target language if available
 * @param {string} category - The category name in English
 * @param {string} lang - The target language code
 * @returns {string} - The translated category
 */
export function translateCategory(category, lang = 'en') {
  const categoryTranslations = {
    politics: {
      en: 'Politics',
      ar: 'سياسة',
      es: 'Política',
      fr: 'Politique',
      de: 'Politik',
      zh: '政治',
      ja: '政治',
      ru: 'Политика',
    },
    business: {
      en: 'Business',
      ar: 'أعمال',
      es: 'Negocios',
      fr: 'Affaires',
      de: 'Wirtschaft',
      zh: '商业',
      ja: 'ビジネス',
      ru: 'Бизнес',
    },
    technology: {
      en: 'Technology',
      ar: 'تكنولوجيا',
      es: 'Tecnología',
      fr: 'Technologie',
      de: 'Technologie',
      zh: '科技',
      ja: 'テクノロジー',
      ru: 'Технологии',
    },
    health: {
      en: 'Health',
      ar: 'صحة',
      es: 'Salud',
      fr: 'Santé',
      de: 'Gesundheit',
      zh: '健康',
      ja: '健康',
      ru: 'Здоровье',
    },
    sports: {
      en: 'Sports',
      ar: 'رياضة',
      es: 'Deportes',
      fr: 'Sports',
      de: 'Sport',
      zh: '体育',
      ja: 'スポーツ',
      ru: 'Спорт',
    },
  };

  // Handle case with country code (e.g., 'en-US')
  const baseLang = lang.split('-')[0].toLowerCase();

  // Check if category exists in translations
  if (categoryTranslations[category.toLowerCase()]) {
    // Return translated category or fallback to English
    return (
      categoryTranslations[category.toLowerCase()][baseLang] ||
      categoryTranslations[category.toLowerCase()]['en'] ||
      category
    );
  }

  return category;
}

/**
 * Formats numbers according to locale standards
 * @param {number} num - The number to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} - The formatted number
 */
export function formatNumber(num, locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale).format(num);
  } catch (e) {
    // Fallback if the locale is not supported
    return new Intl.NumberFormat('en-US').format(num);
  }
}

/**
 * Gets country name from country code
 * @param {string} countryCode - ISO country code (e.g., 'us', 'jp')
 * @param {string} locale - The locale to use for country name
 * @returns {string} - Country name or the original code if not found
 */
export function getCountryName(countryCode, locale = 'en-US') {
  if (!countryCode) return '';

  try {
    const regionNames = new Intl.DisplayNames([locale], { type: 'region' });
    return regionNames.of(countryCode.toUpperCase());
  } catch (e) {
    // Fallback to English or return the code if not supported
    try {
      const regionNames = new Intl.DisplayNames(['en-US'], { type: 'region' });
      return regionNames.of(countryCode.toUpperCase());
    } catch {
      return countryCode.toUpperCase();
    }
  }
}
