import { colorsPalette } from 'constant/colors';
import { DefaultTheme } from "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
    };
    transparency: {
      background: string;
    };
    transition: string;
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    background: colorsPalette.white,
    primary: colorsPalette.darkGrey,
  },
  transparency: {
    background: colorsPalette.whiteOpacity
  },
  transition: '1s',
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: colorsPalette.darkGrey,
    primary: colorsPalette.darkViolet,
  },
  transparency: {
    background: colorsPalette.blackOpacity,
  },
  transition: '1s',
};
