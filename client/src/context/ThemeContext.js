import { createContext, useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { UPDATE_SETTINGS_MUTATION, GET_CURRENT_USER } from '../utils/graphqlQueries';
import {
  discordDarkTheme,
  modernSlateTheme,
  minimalistBlueTheme,
  modernTealTheme,
  purpleTheme,
} from '../themes/themeDefinitions';

export const ThemeContext = createContext();

ThemeContext.displayName = 'ThemeContext';

const themes = {
  'discord-dark': discordDarkTheme,
  'modern-slate': modernSlateTheme,
  'minimalist-blue': minimalistBlueTheme,
  'modern-teal': modernTealTheme,
  'purple-theme': purpleTheme,
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(null);
  const [updateSettings] = useMutation(UPDATE_SETTINGS_MUTATION);
  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'cache-and-network' });
  const theme = themes[currentTheme] || modernSlateTheme;

  useEffect(() => {
    const user = data && data.currentUser;
    if (user && user.settings && user.settings.theme) {
      const themeFromUser = user.settings.theme;
      if (themes[themeFromUser] && themeFromUser !== currentTheme) {
        setCurrentTheme(themeFromUser);
        return;
      }
    }

    if (currentTheme === null) {
      try {
        const saved = localStorage.getItem('selectedTheme');
        setCurrentTheme(saved || 'modern-slate');
      } catch (e) {
        setCurrentTheme('modern-slate');
      }
    }
  }, [data, currentTheme]);

  useEffect(() => {
    if (currentTheme == null) return;
    try {
      localStorage.setItem('selectedTheme', currentTheme);
    } catch (e) {
      // ignore storage errors
    }
  }, [currentTheme]);

  async function switchTheme(themeName) {
    if (!themes[themeName]) return;
    setCurrentTheme(themeName);
    try {
      await updateSettings({ variables: { settings: { theme: themeName } } });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to persist theme setting:', e);
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme,
        switchTheme,
        availableThemes: Object.keys(themes),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
