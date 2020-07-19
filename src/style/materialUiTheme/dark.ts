import { createMuiTheme } from '@material-ui/core/styles';
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

