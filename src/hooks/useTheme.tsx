import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from 'style/materialUiTheme/light'
import { darkTheme } from 'style/materialUiTheme/dark'
import GlobalStyle from 'style/globalStyle';
import theme from 'style/theme'

interface ThemeContextProps {
  themeMode: any;
  setNewTheme: any;
}

export const ThemeContext = createContext({} as ThemeContextProps);

const ThemeContextProvider: React.FC = ({ children }) => {
  const { localStorage } = window;

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "lightTheme"
  );

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const setNewTheme = () => {
    setThemeMode(prevState => {
      if (prevState === 'lightTheme') {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })
  }

  // This is necessary since both material UI and styled-components are being used for now
  const materialTheme = themeMode === 'darkTheme' ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ themeMode, setNewTheme }}>
      <ThemeProvider theme={theme[themeMode]}>
        <GlobalStyle />
          <MaterialThemeProvider theme={materialTheme}>
            {children}
          </MaterialThemeProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;