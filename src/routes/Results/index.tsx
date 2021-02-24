import React, { memo, useContext, useEffect, useMemo } from 'react';
import { NavLink, Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';
import { Wrapper, A, H1, Span, View, Header, Nav } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { backgroundImage } from '../../styles/mixins';
import { headerHeightNormal } from '../../theme/Theme';
import { pixelToRem } from 'meema.utils';
import { trackEvent } from '../../utils/facebookPixel';
import Share from './Share';
import ResultsCard from '../../components/Results/ResultsCard';
import { ButtonNavLink } from '../../components/Elements';
import config from '../../config'; 
import { AppContext } from '../App/context';

const HomeButton = styled(NavLink)`
  color: white;
  padding: ${pixelToRem(20)} 0;
  margin-top: ${pixelToRem(10)};
`

const Results: React.FunctionComponent<{}> = () => {
  const { path } = useRouteMatch();
  const { user } = useContext(AppContext);

  return useMemo(() => (
    <View>
      <Header
        customCss={css`
          padding: ${pixelToRem(40)};
        `}
      >
        <H1
          customCss={css`
            color: white;
            font-size: ${pixelToRem(40)};
            font-family: ${props => props.theme.font.family.primary.bold};
            text-align: center;
            opacity: 0;
            animation: sideInText 500ms forwards ease;
            animation-delay: 250ms;

            @keyframes sideInText {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

          `}
        >{user.fullName}, por tu ADN Greenpeace<br/> descubrimos que:</H1>
      </Header>
      <Wrapper
        customCss={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        `}
      >
        <ResultsCard title='Sentís como' animal={config.animals[0]} delay={1200} />
        <ResultsCard title='Pensás como' animal={config.animals[3]} delay={2400} />
        <ResultsCard title='Tenés la energía de' animal={config.animals[8]} delay={3600} />
      </Wrapper>
      <Nav
        customCss={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: ${pixelToRem(10)} 0;
          margin-top: ${pixelToRem(20)};
          animation: slideInNav 500ms forwards ease;
          animation-delay: 4400ms;
          opacity: 0;
          pointer-events: none;

          @keyframes slideInNav {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
              pointer-events: all;
            }
          }
        `}
      >
        <ButtonNavLink to={`${path}/share`}>Comparti con tus amigos</ButtonNavLink>
        <HomeButton
          to='/'
        >Ir al inicio</HomeButton>
      </Nav>
      <Switch>
        <Route exact path={`${path}/share`}>
          <Share />
        </Route>
      </Switch>
    </View>
  ), [
    path,
    user,
  ]);
}

export default memo(withRouter(Results));