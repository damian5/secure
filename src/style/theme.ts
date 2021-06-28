import { colorsPalette } from 'constant/colors';
import { DefaultTheme, CommonProps } from "styled-components";

const {
  darkRed,
  whiteOpacity,
  shipCove,
  black,
  blackPearl,
  gradients: {
    darkAndDarkBlue
  },
  blackOpacity,
  deepCyanBlue,
  lavender,
  white,
  transparent
} = colorsPalette;

declare module 'styled-components' {
  interface CommonProps {
    spacer: number[];
    fontSize: {
      default: number;
      sm: number;
      md: number;
      lg: number;
    };
    button: {
      primaryBackgroundColor: string;
      color: string;
      activeColor: string;
      disabledBackgroundColor: string;
      borderColor: string;
    },
    label: {
      errorColor: string,
    }
    color: {
      primary: string,
    },
  }
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      authBackground: string;
    };
    transparency: {
      background: string;
    };
    button: {
      primaryBackgroundColor: string;
      color: string;
      disabledBackgroundColor: string;
      borderColor: string;
    },
    input: {
      color: {
        primary: string,
      },
    }
    transition: string;
    commonProps: CommonProps;
  }
}

// Props that will be shared for both themes, for example, log in module
const commonProps: CommonProps = {
  spacer: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
  fontSize: {
    default: 16,
    sm: 14,
    md: 16,
    lg: 20,
  },
  button: {
    primaryBackgroundColor: transparent,
    color: white,
    activeColor: blackPearl,
    disabledBackgroundColor: lavender,
    borderColor: lavender,
  },
  label: {
    errorColor: darkRed,
  },
  color: {
    primary: white,
  },
}

export const lightTheme: DefaultTheme = {
  colors: {
    background: white,
    primary: blackPearl,
    authBackground: darkAndDarkBlue,
  },
  transparency: {
    background: whiteOpacity
  },
  button: {
    primaryBackgroundColor: lavender,
    color: white,
    disabledBackgroundColor: lavender,
    borderColor: shipCove,
  },
  input: {
    color: {
      primary: black,
    },
  },
  transition: '1s',
  commonProps: commonProps,
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: blackPearl,
    primary: lavender,
    authBackground: darkAndDarkBlue,
  },
  transparency: {
    background: blackOpacity,
  },
  button: {
    primaryBackgroundColor: deepCyanBlue,
    color: white,
    disabledBackgroundColor: lavender,
    borderColor: lavender,
  },
  input: {
    color: {
      primary: white,
    },
  },
  transition: '1s',
  commonProps: commonProps,
};
