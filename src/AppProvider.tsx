import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeContextProvider from 'hooks/useTheme';
import FingerPrintContextProvider from 'hooks/useFingerPrint';
import PinCodeContextProvider from 'hooks/usePinCode';
import App from 'App';
import AuthContextProvider from 'hooks/authContext';
import SiteContextProvider from 'hooks/siteContext';

const AppProvider = () => (
  <CssBaseline>
    <AuthContextProvider>
      <SiteContextProvider>
        <PinCodeContextProvider>
          <FingerPrintContextProvider>
            <ThemeContextProvider>
              <Router>
                <App />
              </Router>
            </ThemeContextProvider>
          </FingerPrintContextProvider>
        </PinCodeContextProvider>
      </SiteContextProvider>
    </AuthContextProvider>
  </CssBaseline>
);

export default AppProvider;
