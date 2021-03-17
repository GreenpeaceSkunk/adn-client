// import { ITheme } from "./types";
import { ITheme } from "../types/theme";
import { pixelToRem } from 'meema.utils';

export const borderRadius = 4;

export const colorPrimaryLight = '#73BE1E';
export const colorPrimaryNormal = '#66cc00';
export const colorPrimaryDark = '#005C42';

export const colorSecondaryLight = '#BDBDBD';
export const colorSecondaryNormal = '#4F4F4F';

export const headingColorPrimaryNormal = '#4F4F4F';
export const headingColorSecondaryNormal = colorPrimaryDark;

export const textColorPrimaryNormal = '#4F4F4F';
export const textColorSecondaryNormal = colorPrimaryDark;

export const colorSuccess = '#3c763d';
export const colorError = '#FF4D4F';

export const fontPrimaryThin = 'Font-Primary-Thin';
export const fontPrimaryLight = 'Font-Primary-Light';
export const fontPrimaryBook = 'Font-Primary-Book';
export const fontPrimaryRegular = 'Font-Primary-Regular';
export const fontPrimaryMedium = 'Font-Primary-Medium';
export const fontPrimaryBold = 'Font-Primary-Bold';

export const fontSecondaryLight = 'Font-Secondary-Light';
export const fontSecondaryBook = 'Font-Secondary-Book';
export const fontSecondaryRegular = 'Font-Secondary-Regular';
export const fontSecondaryMedium = 'Font-Secondary-Medium';
export const fontSecondaryBold = 'Font-Secondary-Bold';

export const headerHeightSmall = 64;
export const headerHeightNormal = 64;
export const headerHeightLarge = 64;

export const footerHeightSmall = 120;
export const footerHeightNormal = 70;
export const footerHeightLarge = 70;

export const desktopMinWidth = 1024;
export const tabletMinWidth = 768;
export const tabletMaxWidth = 1023;
export const mobileMaxWidth = 767;

const DefaultTheme: ITheme = {
  borderRadius,
  color: {
    primary: {
      // light: '',
      normal: colorPrimaryNormal,
      dark: colorPrimaryDark,
    },
    secondary: {
      light: colorSecondaryLight,
      normal: colorSecondaryNormal,
      // dark: '',
    },
    tertiary: {
      // light: '',
      // normal: '',
      // dark: '',
    },
    success: {
      normal: colorSuccess,
      // light: '',
      // dark: '',
    },
    warning: {
      // normal: '',
      // light: '',
      // dark: '',
    },
    error: {
      normal: colorError,
      // light: '',
      // dark: '',
    },
  },
  heading: {
    color: {
      primary: {
        // light: '',
        normal: headingColorPrimaryNormal,
        // dark: '',
      },
      secondary: {
        // light: '',
        normal: headingColorSecondaryNormal,
        // dark: '',
      },
    },
  },
  text: {
    color: {
      primary: {
        // light: '',
        normal: textColorPrimaryNormal,
        // dark: '',
      },
      secondary: {
        // light: '',
        normal: textColorSecondaryNormal,
        // dark: '',
      },
    },
  },
  font: {
    size: {
      _default: pixelToRem(16),
      h1: pixelToRem(30),
      h2: pixelToRem(20),
      p: pixelToRem(16),
      span: pixelToRem(16),
      button: pixelToRem(16),
    },
    family: {
      primary: {
        light: fontPrimaryLight,
        book: fontPrimaryBook,
        regular: fontPrimaryRegular,
        medium: fontPrimaryMedium,
        bold: fontPrimaryBold,
      },
      secondary: {
        light: fontSecondaryLight,
        book: fontSecondaryBook,
        regular: fontSecondaryRegular,
        medium: fontSecondaryMedium,
        bold: fontSecondaryBold,
      },
      _default: {
        h1: fontPrimaryRegular,
        h2: fontPrimaryRegular,
        h3: fontPrimaryRegular,
        h4: fontPrimaryRegular,
        h5: fontPrimaryRegular,
        h6: fontPrimaryRegular,
        div: fontPrimaryRegular,
        p: fontPrimaryRegular,
        span: fontPrimaryRegular,
        button: fontPrimaryRegular,
      }
    }
  },
  header: {
    height: {
      small: headerHeightSmall,
      normal: headerHeightNormal,
      large: headerHeightLarge,
    },
  },
  footer: {
    height: {
      small: footerHeightSmall,
      normal: footerHeightNormal,
      large: footerHeightLarge,
    },
  },
  responsive: {
    desktop: {
      minWidth: desktopMinWidth,
    },
    tablet: {
      minWidth: tabletMinWidth,
      maxWidth: tabletMaxWidth,
    },
    mobile: {
      maxWidth: mobileMaxWidth,
    },
  },
};

export const LightTheme = {...DefaultTheme};
export const DarkTheme = {...DefaultTheme};

export default DefaultTheme;