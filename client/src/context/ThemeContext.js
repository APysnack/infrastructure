import React, { createContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { UPDATE_SETTINGS_MUTATION } from '../utils/graphqlQueries';
import {
  discordDarkTheme,
  modernSlateTheme,
  minimalistBlueTheme,
  modernTealTheme,
  purpleTheme,
} from '../themes/themeDefinitions';

export const ThemeContext = createContext();

const themes = {
  'discord-dark': discordDarkTheme,
  'modern-slate': modernSlateTheme,
  'minimalist-blue': minimalistBlueTheme,
  'modern-teal': modernTealTheme,
  'purple-theme': purpleTheme,
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

  const [updateSettings] = useMutation(UPDATE_SETTINGS_MUTATION);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);

      try {
        updateSettings({ variables: { settings: { theme: themeName } } });
      } catch (e) {
        // console.error('Failed to persist theme', e);
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, theme, switchTheme, availableThemes: Object.keys(themes) }}
    >
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
