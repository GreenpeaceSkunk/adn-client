import React, { Suspense, memo, useMemo, useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Wrapper } from '@bit/meema.ui-components.elements';
import Widgets from '../Widgets';
import { AppContext } from './context';
import { pushToDataLayer } from '../../utils/gtm';
import { trackEvent } from '../../utils/facebookPixel';
import { initialize as initializeTagManager } from '../../utils/gtm';
import { initialize as initializeFacebookPixel } from '../../utils/facebookPixel';
import { GameProvider } from '../Game/context';
import { pixelToRem } from 'meema.utils';

const MainHeader = React.lazy(() => import('../Header'));
const MainFooter = React.lazy(() => import('../Footer'));
const HomeView = React.lazy(() => import('../Home'));
const ResultsRouter = React.lazy(() => import('../Results/router'));
const TutorialRouter = React.lazy(() => import('../Tutorial/router'));
const GameRouter = React.lazy(() => import('../Game/router'));
const ScannerRouter = React.lazy(() => import('../Scanner/router'));
const Registration = React.lazy(() => import('../Registration'));

if(!process.env.DEBUG_MODE) {
  initializeTagManager();
  initializeFacebookPixel();
}

const Main = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  min-height: 100vh;
  overflow: hidden;
  font-family: ${({theme}) => theme.font.family.primary.regular};
`;

const Router: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if(!process.env.DEBUG_MODE) {
      trackEvent('PageView');
      pushToDataLayer('pageview');
    }
  }, [
    pathname,
  ]);

  return useMemo(() => (
    <Switch>
      <Route path='/'>
        <Main>
          <Suspense fallback={<Widgets.Loader type='light' />}>
            <MainHeader />
          </Suspense>
          <GameProvider>
            <Suspense fallback={<Widgets.Loader type='light' />}>
              <Switch>
                <Route exact path='/scanner'>
                  <ScannerRouter/>
                </Route>
                <Route path='/tutorial'>
                  <TutorialRouter/>
                </Route>
                <Route path='/game'>
                    <GameRouter />
                </Route>
                <Route path='/results'>
                  <ResultsRouter />
                </Route>
                <Route path='/'>
                  <HomeView />
                </Route>
              </Switch>
            </Suspense>
          </GameProvider>
          <Suspense fallback={<Widgets.Loader type='light' />}>
            <MainFooter />
          </Suspense>
        </Main>

        <Route path='/registration'>
          <Suspense fallback={<Widgets.Loader type='light' />}>
            <Registration />
          </Suspense>
        </Route>
      </Route>
    </Switch>
  ), [
    searchParams,
    pathname,
  ]);
}

Router.displayName = 'AppRouter';
export default memo(Router);

{/* <Wrapper
            customCss={css`
              position: relative;
              height: ${({theme}) => pixelToRem(window.innerHeight - theme.header.mobile.height - theme.footer.mobile.height)};
              background-color: orange;
              
              @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                height: ${({theme}) => pixelToRem(window.innerHeight - theme.header.tablet.height - theme.footer.tablet.height)};
                background-color: pink;
              }
              
              @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
                height: ${({theme}) => pixelToRem(window.innerHeight - theme.header.desktop.height - theme.footer.desktop.height)};
                background-color: brown;
              }
            `}
          >
          </Wrapper> */}
          