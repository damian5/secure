import { createGlobalStyle, css } from 'styled-components';
import GothamWoff from 'assets/fonts/GothamPro.woff';
import GothamWoff2 from 'assets/fonts/GothamPro.woff2';
import GothamTtf from 'assets/fonts/GothamPro.ttf';
import GothamSvg from 'assets/fonts/GothamPro.svg';
import GothamEot from 'assets/fonts/GothamPro.eot';

const fontFace = css`
  @font-face {
    font-family: 'Gotham';
    font-style: normal;
    font-weight: 400;
    src: url(${GothamEot});
    src: local('Open Sans'), local('OpenSans'),
        url(${GothamWoff2}) format('woff2'),
        url(${GothamWoff}) format('woff'),
        url(${GothamTtf}) format('truetype'),
        url(${GothamSvg}) format('svg');
  }
`

const GlobalStyle = createGlobalStyle<{theme: any}>`
  ${({ theme }) => css`
    ${fontFace}

    html {
      height: 100%;
      width: 100%;
    }

    #root {
      background: ${theme.colors.background}
    }

    body {
      margin: 0;
      width: 100vw;
      height: 100vh;
      font-family: 'Gotham';
      font-weight: 400;
      font-style: normal;
    }

    p {
      font-weight: 600;
      color: ${theme.colors.primary};
    }

    h1, h2, h3, h4, h5 {
      font-weight: 600;
      color: ${theme.colors.primary};
    }
  `}
`;

export default GlobalStyle;
