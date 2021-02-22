import React, { memo, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { Nav, View, Img } from '@bit/meema.ui-components.elements';
import { ButtonNavLink } from '../../components/Elements';
import styled, { css } from 'styled-components';
import { ArrowRightIcon } from '../../assets/images';
import TutorialStepOne from './TutorialStepOne';
import TutorialStepTwo from './TutorialStepTwo';
import Carousel from '@bit/meema.ui-components.carousel';
// import RegistrationForm from '../Registration';
import { AppContext } from '../App/context';
import { Link, NavLink } from 'react-router-dom';
import { pixelToRem } from 'meema.utils';
// import config from '../../config.yml';
// console.log(config);

const IconImage = styled(Img)`
  margin-left: 10px;
`;

const Tutorial: React.FunctionComponent<{}> = () => {
  const {path} = useRouteMatch();
  return useMemo(() => (
    <View>
      <Switch>
        <Route exact path={path}>
          <TutorialStepOne />
        </Route>
        {/* <Route exact path={`${path}/step/2`}>
          <TutorialStepTwo />
        </Route> */}
        {/* <Redirect from={path} to={`${path}/step/1`} /> */}
      </Switch>
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
          {/* <Route exact path={`${path}/step/1`}>
            <ButtonNavLink
              to={`${path}/step/2`}
              format='outlined'
            >Siguiente <IconImage src={ArrowRightIcon} /></ButtonNavLink>
          </Route> */}
          <Route exact path={path}>
            <ButtonNavLink to={`/`} style={{border: 'none'}}>Anterior</ButtonNavLink>
            <ButtonNavLink
              to='/game'
              format='outlined'
            >Siguiente<IconImage src={ArrowRightIcon} /></ButtonNavLink>
          </Route>
        </Switch>
      </Nav>
    </View>
  ), []);
};

export default memo(withRouter(Tutorial));
