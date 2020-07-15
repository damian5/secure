import { colorsPalette } from 'constant/colors';

export default {
  lightTheme: {
    colors: {
      background: colorsPalette.white,
      primary: colorsPalette.darkGrey,
    },
    transition: '0.3s',
  },
  darkTheme: {
    colors: {
      background: colorsPalette.darkGrey,
      primary: colorsPalette.darkViolet,
    },
    transition: '0.3s',
  },
}