export interface Theme  {
  colors: {
    background: string,
    primary: string,
  },
  transparency: {
    background: string
  },
  transition: string,
};

export interface Themes {
  lightTheme: Theme,
  darkTheme: Theme,
};
