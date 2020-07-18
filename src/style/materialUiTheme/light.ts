import { createMuiTheme } from '@material-ui/core/styles';
import { colorsPalette } from 'constant/colors';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colorsPalette.grey,
    },
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        borderTop: '1px solid grey'
      }
    },
  }
});

