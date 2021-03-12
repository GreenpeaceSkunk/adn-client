import React, { Suspense, memo, useMemo, useContext } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../theme/globalStyle';
import {DarkTheme as Theme} from '../../theme/Theme';
import { Wrapper } from '@bit/meema.ui-components.elements';
import ErrorBoundary from '../ErrorBoundary';
import { Loader } from '../Shared';
import { AppContext, AppProvider } from './context';
// import { pushToDataLayer } from '../../utils/gtm';
// import { trackEvent } from '../../utils/facebookPixel';
import { initialize as initializeTagManager } from '../../utils/gtm';
import { initialize as initializeFacebookPixel } from '../../utils/facebookPixel';
import { 
  BackgroundHome,
} from '../../assets/images';
import { GameProvider } from '../Game/context';

const MainHeader = React.lazy(() => import('../Header'));
const MainFooter = React.lazy(() => import('../Footer'));
const HomeView = React.lazy(() => import('../../routes/Home'));
const ResultsRouter = React.lazy(() => import('../Results/router'));
const TutorialRouter = React.lazy(() => import('../Tutorial/router'));
const GameRouter = React.lazy(() => import('../Game/router'));
const ScannerRouter = React.lazy(() => import('../Scanner/router'));
const Registration = React.lazy(() => import('../Modal/Registration'));

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
  font-family: ${({theme}) => theme.font.family.primary.regular};
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
          <Switch>
            <Route path='/'>
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
                  <GameProvider>
                    <Switch>
                      <Route exact path='/scanner'>
                        <Suspense fallback={<Loader />}>
                          <ScannerRouter/>
                        </Suspense>
                      </Route>
                      <Route path='/tutorial'>
                        <Suspense fallback={<Loader />}>
                          <TutorialRouter/>
                        </Suspense>
                      </Route>
                      <Route path='/game'>
                        <Suspense fallback={<Loader />}>
                          <GameRouter />
                        </Suspense>
                      </Route>
                      
                      <Route path='/results'>
                        <Suspense fallback={<Loader />}>
                          <ResultsRouter />
                        </Suspense>
                      </Route>

                      <Route path='/'>
                        <Suspense fallback={<Loader />}>
                          <HomeView />
                        </Suspense>
                      </Route>
                    </Switch>

                  </GameProvider>
                </Wrapper>
                <Suspense fallback={<Loader />}>
                  <MainFooter />
                </Suspense>
              </Main>

              <Route path='/registration'>
                <Suspense fallback={<Loader />}>
                  <Registration />
                </Suspense>
              </Route>

            </Route>
          </Switch>
        </AppProvider>
      </ErrorBoundary>
    </ThemeProvider>
  ), [
    searchParams,
    pathname,
  ]);
}

export default memo(App);
