import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'style/globalStyle';
import { lightTheme, darkTheme } from 'style/theme'
interface ThemeContextProps {
  themeMode: string;
  setNewTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

const ThemeContextProvider: React.FC = ({ children }) => {
  const { localStorage } = window;

  const [themeMode, setThemeMode] = useState<string>(
    localStorage.getItem('theme') || 'lightTheme'
  );

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
  }, [themeMode, localStorage]);

  const setNewTheme = () => {
    setThemeMode(prevState => {
      if (prevState === 'lightTheme') {
        return 'darkTheme';
      } else {
        return 'lightTheme';
      }
    });
  };

  const themeSelector = themeMode === 'lightTheme' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, setNewTheme }}>
      <ThemeProvider theme={themeSelector}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;