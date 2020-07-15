import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { colorsPalette } from 'constant/colors';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: colorsPalette.superDarkGrey,
    },
    primary: {
      main: colorsPalette.darkViolet,
    },
    secondary: {
      main: colorsPalette.darkViolet,
    }
  },
});

