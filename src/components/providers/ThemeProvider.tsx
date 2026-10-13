'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

// ============================================
// Types
// ============================================

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// ============================================
// Context
// ============================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================
// Provider Component
// ============================================

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setIsMounted(true);
    
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (storedTheme) {
      setThemeState(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }
  }, []);

  // Apply theme to document when it changes
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme, isMounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isMounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isMounted]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent flash of wrong theme
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useTheme() {
  const context = useContext(ThemeContext);
  
  // Return default values if used outside ThemeProvider
  if (context === undefined) {
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  
  return context;
}