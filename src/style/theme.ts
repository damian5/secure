import { colorsPalette } from 'constant/colors';
import { Themes } from 'interfaces/theme';

export default {
  lightTheme: {
    colors: {
      background: colorsPalette.white,
      primary: colorsPalette.darkGrey,
    },
    transparency: {
      background: colorsPalette.whiteOpacity
    },
    transition: '1s',
  },
  darkTheme: {
    colors: {
      background: colorsPalette.darkGrey,
      primary: colorsPalette.darkViolet,
    },
    transparency: {
      background: colorsPalette.blackOpacity,
    },
    transition: '1s',
  },
} as Themes;