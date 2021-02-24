import React, { Suspense, memo, useMemo, useEffect, useContext } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../theme/globalStyle';
// import { pushToDataLayer } from '../../utils/gtm';
import {DarkTheme as Theme} from '../../theme/Theme';
import { Wrapper, H1, Span, P, Nav,  } from '@bit/meema.ui-components.elements';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Loader } from '../../components/Shared';
import MainFooter, {TinyFooter} from '../../components/Footer';
// import { trackEvent } from '../../utils/facebookPixel';
import { AppContext, AppProvider } from './context';
import { initialize as initializeTagManager } from '../../utils/gtm';
import { initialize as initializeFacebookPixel } from '../../utils/facebookPixel';
import { 
  BackgroundHome,
} from '../../assets/images';

const MainHeader = React.lazy(() => import('../../components/Header'));
const HomeView = React.lazy(() => import('../Home'));
const ResultsView = React.lazy(() => import('../Results'));
const TutorialView = React.lazy(() => import('../Tutorial'));
const GameView = React.lazy(() => import('../Game'));
// const GameView = React.lazy(() => import('../../components/Game'));
const AnalysisView = React.lazy(() => import('../Analysis'));

const Main = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  min-height: 100vh;
  background: ${props => props.theme.color.primary.normal};
  background-image: linear-gradient(0, #005C42 0%, rgba(0, 92, 66, 0) 100%), url(${BackgroundHome});
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

// initializeTagManager();
// initializeFacebookPixel();

const App: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { pathname } = useLocation();

  // useEffect(() => {
  //   trackEvent('PageView');
  //   pushToDataLayer('pageview');
  // }, [ pathname ]);

  return useMemo(() => (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <AppProvider>
          <Main>
            <Suspense fallback={<Loader />}>
              <MainHeader />
            </Suspense>
            <Wrapper
              customCss={css`
                min-height: calc(100vh - 5rem - 5rem);
                position: relative;
              `}
            >
              <Switch>
                <Route exact path='/analysis'>
                  <Suspense fallback={<Loader />}>
                    <AnalysisView/>
                  </Suspense>
                </Route>
                <Route path='/tutorial'>
                  <Suspense fallback={<Loader />}>
                    <TutorialView/>
                  </Suspense>
                </Route>
                <Route path='/game'>
                  <Suspense fallback={<Loader />}>
                    <GameView/>
                  </Suspense>
                </Route>
                <Route path='/results'>
                  <Suspense fallback={<Loader />}>
                    <ResultsView/>
                  </Suspense>
                </Route>
                <Route path='/'>
                  <Suspense fallback={<Loader />}>
                    <HomeView />
                  </Suspense>
                </Route>
              </Switch>
            </Wrapper>
            <Suspense fallback={<Loader />}>
              <MainFooter />
            </Suspense>
          </Main>
        </AppProvider>
      </ErrorBoundary>
    </ThemeProvider>
  ), [
    searchParams,
  ]);
}

export default memo(App);
