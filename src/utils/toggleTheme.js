// d:/ASRTO-CMS/landing-cms/src/utils/toggleTheme.js

function _applyTheme(theme) {
  if (typeof document === 'undefined') return;

  // Remove all custom theme classes
  document.documentElement.classList.remove(
    'theme-arabic',
    'theme-german',
    'theme-chinese',
    'theme-bn-bd-adult',
    'theme-default',
    'dark',
    'light',
  );

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.add('light');
  } else if (theme.startsWith('theme-')) {
    document.documentElement.classList.add(theme);
  }

  // Save choice in localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
}

export function initializeTheme() {
  if (
    typeof window === 'undefined' ||
    typeof localStorage === 'undefined' ||
    typeof document === 'undefined'
  )
    return;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    _applyTheme(savedTheme);
  } else if (systemPrefersDark) {
    _applyTheme('dark');
  } else {
    _applyTheme('light'); // Тема по умолчанию
  }
}

// Экспорт по умолчанию для функции переключения темы
function toggleThemeFunction() {
  if (typeof document === 'undefined') return;

  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  _applyTheme(isCurrentlyDark ? 'light' : 'dark');
}

export default toggleThemeFunction;

if (typeof window !== 'undefined') {
  window.toggleTheme = toggleThemeFunction;
  window.initializeTheme = initializeTheme;
}
