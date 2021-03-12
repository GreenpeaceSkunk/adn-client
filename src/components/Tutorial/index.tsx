import React, { memo, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { Nav, View, Img } from '@bit/meema.ui-components.elements';
import { ButtonNavLink } from '../Elements';
import styled, { css } from 'styled-components';
import { ArrowRightIcon } from '../../assets/images';
import { pixelToRem } from 'meema.utils';

const TutorialStepRouter = React.lazy(() => import('./TutorialStep/router'));

const IconImage = styled(Img)`
  margin-left: 10px;
`;

const Tutorial: React.FunctionComponent<{}> = () => {
  const { path } = useRouteMatch();

  return useMemo(() => (
    <View>
      <Switch>
        <Redirect from={path} to={`${path}/1`} />
      </Switch>
      
      <TutorialStepRouter />
        
      <Nav
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
            <ButtonNavLink to={`/`} style={{border: 'none'}}>Anterior</ButtonNavLink>
            <ButtonNavLink to='/game' format='outlined'>
              Siguiente<IconImage src={ArrowRightIcon} />
            </ButtonNavLink>
          </Route>
        </Switch>
      </Nav>
    </View>
  ), [
    path,
  ]);
};

export default memo(withRouter(Tutorial));
