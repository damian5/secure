import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';
import ThemeContextProvider from 'hooks/useTheme';

const App = () => {
  return (
    <CssBaseline>
      <ThemeContextProvider>
        <Router>
          <Routes/>
        </Router>
      </ThemeContextProvider>
    </CssBaseline>
  );
};

export default App;
