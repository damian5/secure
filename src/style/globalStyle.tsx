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

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    ${fontFace}
    html, body, #root {
      height: 100%
    }
    body {
      margin: 0;
      width: 100vw;
      height: 100%;
      font-family: 'Gotham';
      background: ${theme.colors.background};
      font-weight: 400;
      font-size: ${theme.commonProps.fontSize.default}px;
      font-style: normal;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
    }

    p {
      font-weight: 600;
      font-size: ${theme.commonProps.fontSize.default}px;
      color: ${theme.colors.primary};
    }

    h1, h2, h3, h4, h5 {
      font-weight: 600;
      color: ${theme.colors.primary};
    }

    .MuiBottomNavigation-root {
      position: fixed;
      bottom: 0;
      height: 70px;
      background: transparent;
      width: 100%;
    }


/* .MuiBottomNavigationAction-root.Mui-selected
    .MuiSvgIcon-root {

    } */


      &&.MuiBottomNavigationAction-root.Mui-selected {
        color: 'red';
       background-color: 'blue' !important;
      }

    .blur-div {
      bottom: 0;
      position: fixed;
      height: 70px;
      background: ${theme.transparency.background};
      width: 100%;
      backdrop-filter: blur(5px);
    }
  `}
`;

export default GlobalStyle;
