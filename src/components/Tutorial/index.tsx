import React, { memo, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { Wrapper, Nav, View, Svg } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Widgets from '../Widgets';

const ButtonNav = styled(Widgets.ButtonNavLink)`
  justify-content: center;
  /* min-width: ${pixelToRem(250)}; */
  /* margin-bottom: ${pixelToRem(20)}; */
  margin-right: 0;

  @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
    margin-bottom: 0;
    font-size: ${pixelToRem(32)};
    /* margin-right: ${pixelToRem(20)}; */
  }
`;

const TutorialStepRouter = React.lazy(() => import('./TutorialStep/router'));

const Tutorial: React.FunctionComponent<{}> = () => {
  const { path } = useRouteMatch();

  return useMemo(() => (
    <Widgets.View
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
          
        }
      `}
    >
      <Switch>
        <Redirect from={path} to={`${path}/1`} />
      </Switch>
      
      <React.Suspense fallback={<Widgets.Loader />}>
        <TutorialStepRouter />
      </React.Suspense>
        
      <Wrapper
        customCss={css`
          display: flex;
          justify-content: center;

          & > * {
            margin: 0 ${pixelToRem(10)};
          }
        `}
      >
        <Switch>
          <Route exact path={`${path}/1`}>
            <Nav
              customCss={css`
                display: flex;
                /* flex-direction: column; */
                flex-direction: row;
                margin: ${pixelToRem(20)} 0;

                @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
                  flex-direction: row;
                }
              `}
            >
              <ButtonNav
                to='/'
                format='text'
              >Anterior</ButtonNav>
              <ButtonNav
                to='/game'
                format='outlined'
              >Siguiente
                
              </ButtonNav>
            </Nav>
          </Route>
        </Switch>
      </Wrapper>
    </Widgets.View>
  ), [
    path,
  ]);
};

export default memo(withRouter(Tutorial));
