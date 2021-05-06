import React, { useMemo, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../theme/globalStyle';
import {DarkTheme as Theme} from '../../theme/Theme';
import { Wrapper } from '@bit/meema.ui-components.elements';
import ErrorBoundary from '../ErrorBoundary';
import { AppContext, AppProvider } from './context';
import { BackgroundHome } from '../../assets/images';
import { animateScroll as scroll } from 'react-scroll';
import AppRouter from './router';
import { pushToDataLayer } from '../../utils/gtm';
import { trackEvent } from '../../utils/facebookPixel';
import { initialize as initializeTagManager } from '../../utils/gtm';
import { initialize as initializeFacebookPixel } from '../../utils/facebookPixel';

if(process.env.REACT_APP_DEBUG_MODE === 'false') {
  initializeTagManager();
  initializeFacebookPixel();
}

const Component: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { pathname } = useLocation();
  
  useEffect(() => {
    scroll.scrollToTop({
      duration: 250,
      smooth: 'easeInOutQuart',
    });
    
    if(process.env.REACT_APP_DEBUG_MODE === 'false') {
      console.log('Entra')
      trackEvent('PageView');
      pushToDataLayer('pageview');
    }
  }, [
    pathname,
  ]);

  return useMemo(() => (
    <>
      <Wrapper
        customCss={css`
          background: ${props => props.theme.color.primary.normal};
          background-image: linear-gradient(0, #005C42 0%, rgba(0, 92, 66, 0) 100%), url(${BackgroundHome});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: -1;
        `}
      />
      <AppRouter />
    </>
  ), [
    searchParams,
    pathname,
  ]);
}
Component.displayName = 'App';

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <AppProvider>
          <Component />
        </AppProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
