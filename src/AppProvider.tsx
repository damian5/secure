import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeContextProvider from 'hooks/useTheme';
import FingerPrintContextProvider from 'hooks/useFingerPrint';
import App from "App";

const AppProvider = () => (
  <CssBaseline>
    <FingerPrintContextProvider>
      <ThemeContextProvider>
        <Router >
          <App />
        </Router>
      </ThemeContextProvider>
    </FingerPrintContextProvider>
  </CssBaseline>

);

export default AppProvider;
