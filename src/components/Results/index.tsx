import React, { createContext, memo, useContext, useEffect, useMemo, useState } from 'react';
import { NavLink, useRouteMatch, withRouter } from 'react-router-dom';
import { Wrapper, A, H1, View, Header, Nav } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import ResultsCard from './Card';
import { ButtonNavLink } from '../Widgets';
import { AppContext } from '../App/context';
import { GameContext } from '../Game/context';
import { IAnimal } from 'greenpeace';

interface IContext {
  results: IAnimal[];
}

const HomeButton = styled(NavLink)`
  color: white;
  padding: ${pixelToRem(20)} 0;
  margin-top: ${pixelToRem(10)};
`
const Context = createContext({} as IContext);
const { Provider } = Context;

const Component: React.FunctionComponent<{}> = memo(withRouter(() => {
  const { path } = useRouteMatch();
  const { user } = useContext(AppContext);
  const { results } = useContext(GameContext);
  const [ sortedResults, setSortedResults ] = useState<IAnimal[]>([]);

  useEffect(() => {
    if(results.length) {
      setSortedResults(results.sort(() => 0.5 - Math.random()));
    }
  }, [
    results,
  ]);

  return useMemo(() => (
    <Provider
      value={{
        results,
      }}
    >
      <View>
        <Header
          customCss={css`
            padding: ${pixelToRem(40)};
          `}
        >
          <H1
            customCss={css`
              color: white;
              font-size: ${pixelToRem(30)};
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

              @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
                font-size: ${pixelToRem(40)};
              }
            `}
          >{user?.fullName}, por tu ADN Greenpeace<br/> descubrimos que:</H1>
        </Header>
        <Wrapper
          customCss={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
              flex-direction: row;
            }
          `}
        >
          {(sortedResults.length === 3) && (
            <>
              <ResultsCard title='Sentís como' animal={sortedResults[0]} cardType='feeling' delay={600} />
              <ResultsCard title='Pensás como' animal={sortedResults[1]} cardType='thought' delay={1200} />
              <ResultsCard title='Tenés la energía de' animal={sortedResults[2]} cardType='energy' delay={1800} />
            </>
          )}
        </Wrapper>
        <Nav
          customCss={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: ${pixelToRem(10)} 0;
            margin-top: ${pixelToRem(50)};
            animation: slideInNav 500ms forwards ease;
            animation-delay: 2800ms;
            opacity: 0;

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
          <ButtonNavLink to={`${path}/share`}>¡Compartí el test con amigos!</ButtonNavLink>
          <HomeButton to='/'>Ir al inicio</HomeButton>
        </Nav>
      </View>
    </Provider>
  ), [
    path,
    user,
    results,
    sortedResults,
  ]);
}));

export {
  Context as ResultsContext,
}

Component.displayName = 'Results';
export default Component;
