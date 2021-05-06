import React, { memo, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { Wrapper, Nav, View, Svg } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Widgets from '../Widgets';

const ButtonNav = styled(Widgets.ButtonNavLink)`
  justify-content: center;
  margin-right: 0;

  @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
    margin-bottom: 0;
    font-size: ${pixelToRem(32)};
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
        <Redirect exact from={path} to={`${path}/1`} />
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
                flex-direction: row;
                margin: ${pixelToRem(20)} 0;

                a {
                  margin-right: ${pixelToRem(10)};

                  &:last-child {
                    margin-right: 0;
                  }
                }

                @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
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
                <Svg width="11" height="18" viewBox="0 0 11 18" fill="none">
                  <path d="M0.93934 14.9393C0.353553 15.5251 0.353553 16.4749 0.93934 17.0607C1.52513 17.6464 2.47487 17.6464 3.06066 17.0607L0.93934 14.9393ZM9 9L10.0607 10.0607C10.342 9.77936 10.5 9.39782 10.5 9C10.5 8.60217 10.342 8.22064 10.0607 7.93934L9 9ZM3.06066 0.93934C2.47487 0.353554 1.52513 0.353554 0.939339 0.93934C0.353553 1.52513 0.353553 2.47487 0.939339 3.06066L3.06066 0.93934ZM3.06066 17.0607L10.0607 10.0607L7.93934 7.93934L0.93934 14.9393L3.06066 17.0607ZM10.0607 7.93934L3.06066 0.93934L0.939339 3.06066L7.93934 10.0607L10.0607 7.93934Z" fill="white"/>
                </Svg>
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
