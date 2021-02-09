/// <reference path="../fonts/index.d.ts" />

import { createGlobalStyle, css, DefaultTheme } from "styled-components";
import { 
  fontPrimaryLight,
  fontPrimaryThin,
  fontPrimaryRegular,
  fontPrimaryBold,
  fontPrimaryMedium,
} from 'greenpeace-ui-themes';

import RobotoLightFont from '../fonts/Roboto/Roboto-Light.ttf';
import RobotoRegularFont from '../fonts/Roboto/Roboto-Regular.ttf';
import RobotoMediumFont from '../fonts/Roboto/Roboto-Medium.ttf';

import ProximaNovaBoldWoffFont from '../fonts/ProximaNova/Proxima-Nova-Bold.woff';
import ProximaNovaBoldWoff2Font from '../fonts/ProximaNova/Proxima-Nova-Bold.woff2';
import ProximaNovaThinWoffFont from '../fonts/ProximaNova/Proxima-Nova-Thin.woff';
import ProximaNovaThinWoff2Font from '../fonts/ProximaNova/Proxima-Nova-Thin.woff2';


// Proxima-Nova-Black-Italic.woff
// Proxima-Nova-Black-Italic.woff2
// Proxima-Nova-Black.woff
// Proxima-Nova-Black.woff2
// Proxima-Nova-Bold-Italic.woff
// Proxima-Nova-Bold-Italic.woff2
// Proxima-Nova-Bold.woff
// Proxima-Nova-Bold.woff2
// Proxima-Nova-Extra-Bold-Italic.woff
// Proxima-Nova-Extra-Bold-Italic.woff2
// Proxima-Nova-Semi-Bold.woff
// Proxima-Nova-Semi-Bold.woff2
// Proxima-Nova-Thin-Italic.woff
// Proxima-Nova-Thin-Italic.woff2
// Proxima-Nova-Thin.woff
// Proxima-Nova-Thin.woff2

const shared = css`
  font-weight: normal;
  font-style: normal;
`

export const GlobalStyle = createGlobalStyle<DefaultTheme>`

@font-face {
    font-family: ${fontPrimaryThin};
    src:  url(${ProximaNovaThinWoff2Font}) format('woff2'),
          url(${ProximaNovaThinWoffFont}) format('woff');
    ${shared};
  }

  @font-face {
    font-family: ${fontPrimaryLight};
    src:  url(${RobotoLightFont});
    ${shared};
  }

  @font-face {
    font-family: ${fontPrimaryRegular};
    src:  url(${RobotoRegularFont});
    ${shared};
  }
  
  @font-face {
    font-family: ${fontPrimaryMedium};
    src:  url(${RobotoMediumFont});
    ${shared};
  }
  
  @font-face {
    font-family: ${fontPrimaryBold};
    src:  url(${ProximaNovaBoldWoff2Font}) format('woff2'),
          url(${ProximaNovaBoldWoffFont}) format('woff');
    ${shared};
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${fontPrimaryRegular};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  ul {
    list-style-type: none;
  }

`;
