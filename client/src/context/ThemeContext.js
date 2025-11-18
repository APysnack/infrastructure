import React, { createContext, useState, useEffect } from 'react';
import {
  discordDarkTheme,
  modernSlateTheme,
  minimalistBlueTheme,
  modernTealTheme,
  warmOrangeTheme,
  purpleTheme,
} from '../themes/themeDefinitions';

export const ThemeContext = createContext();

const themes = {
  'discord-dark': discordDarkTheme,
  'modern-slate': modernSlateTheme,
  'minimalist-blue': minimalistBlueTheme,
  'modern-teal': modernTealTheme,
  'warm-orange': warmOrangeTheme,
  'purple': purpleTheme,
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Load theme from localStorage, default to modern-slate
    const saved = localStorage.getItem('selectedTheme');
    return saved || 'modern-slate';
  });

  useEffect(() => {
    // Save theme selection to localStorage
    localStorage.setItem('selectedTheme', currentTheme);
  }, [currentTheme]);

  const theme = themes[currentTheme];

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, switchTheme, availableThemes: Object.keys(themes) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
