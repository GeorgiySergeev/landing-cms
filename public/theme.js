// Theme Toggle Utility
(function () {
  console.log('Theme utility script loaded!');

  // Объявляем функцию в глобальной области для доступа из всех частей файла
  function _applyTheme(theme) {
    if (typeof document === 'undefined') return;

    console.log('Applying theme:', theme);

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
      console.log('Added dark class');
    } else if (theme === 'light') {
      document.documentElement.classList.add('light');
      console.log('Added light class');
    } else if (theme.startsWith('theme-')) {
      document.documentElement.classList.add(theme);
      console.log('Added theme class:', theme);
    }

    // Save choice in localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
      console.log('Saved theme preference to localStorage:', theme);
    }
  }

  function initializeTheme() {
    if (
      typeof window === 'undefined' ||
      typeof localStorage === 'undefined' ||
      typeof document === 'undefined'
    ) {
      console.error('Required browser APIs are not available');
      return;
    }

    console.log('Initializing theme');
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme from localStorage:', savedTheme);

    const systemPrefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('System prefers dark mode:', systemPrefersDark);

    if (savedTheme) {
      _applyTheme(savedTheme);
    } else if (systemPrefersDark) {
      _applyTheme('dark');
    } else {
      _applyTheme('light');
    }
  }

  function toggleThemeFunction() {
    if (typeof document === 'undefined') return;

    console.log('Toggle theme function called');
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    console.log('Is currently dark?', isCurrentlyDark);
    _applyTheme(isCurrentlyDark ? 'light' : 'dark');
  }
  // Make functions available globally
  window.toggleTheme = toggleThemeFunction;
  window.initializeTheme = initializeTheme;

  // Делаем _applyTheme доступной глобально для отладки
  window._applyTheme = _applyTheme;

  // Auto-initialize theme immediately
  console.log('Auto initializing theme');
  initializeTheme();

  // Also ensure initialization once DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded, reinitializing theme');
    initializeTheme();
  });
})();
