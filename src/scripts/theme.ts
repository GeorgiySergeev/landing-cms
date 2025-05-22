// This script ensures that theme functionality is properly initialized
// and accessible throughout the application

import { initializeTheme } from '../utils/toggleTheme';
import toggleThemeFunction from '../utils/toggleTheme';

// Run on client-side only
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Make sure toggleTheme is available globally
  window.toggleTheme = toggleThemeFunction;

  // Initialize theme on page load
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
  });

  // Watch for system preference changes
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Modern browsers
    if (colorSchemeQuery.addEventListener) {
      colorSchemeQuery.addEventListener('change', (e) => {
        // Only apply if the user hasn't set a preference
        if (!localStorage.getItem('theme')) {
          if (e.matches) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      });
    }
  }
}
