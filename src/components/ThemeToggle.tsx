import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initial state based on current theme
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }

    // Create a MutationObserver to watch for changes to the class attribute
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          const hasDarkClass =
            document.documentElement.classList.contains('dark');
          setIsDark(hasDarkClass);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined' && window.toggleTheme) {
      window.toggleTheme();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md bg-gray-200 px-4 py-2 transition-colors dark:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
