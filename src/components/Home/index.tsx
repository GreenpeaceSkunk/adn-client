import React, { memo, useContext, useMemo } from 'react';
import { useRouteMatch, withRouter } from 'react-router';
import { Wrapper, H1 } from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { AppContext } from '../App/context';
import { pixelToRem } from 'meema.utils';
import Widgets from '../Widgets';
import Bubbles from './Bubbles';

const Home: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { path } = useRouteMatch();
  
  return useMemo(() => (
    <Widgets.View>
      <Wrapper
        customCss={css`
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;

          @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
            flex-direction: row;
          }
        `}
      >
        <Wrapper
          customCss={css`
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            padding: ${pixelToRem(20)};
            z-index: 99;
            width: 100%;
            transition: all 250ms ease;
            /* background-color: red; */

            @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
              padding: ${pixelToRem(40)} 0 ${pixelToRem(40)} ${pixelToRem(40)};
              width: 40%;
            }
          `}
        >
          <H1
            customCss={css`
              color: white;
              font-size: ${pixelToRem(36)};

              @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
                font-size: ${pixelToRem(58)};
              }
            `}
          >Descubrí a qué animal autóctono te parecés más</H1>
          <Widgets.ButtonNavLink
            to='/registration'
            style={{
              marginTop: pixelToRem(30),
            }}
          >Comenzar
          </Widgets.ButtonNavLink>
        </Wrapper>

        <Wrapper
          customCss={css`
            position: relative;
            display: flex;
            justify-content: center;
            flex-grow: 0;
            flex-shrink: 0;
            width: 100%;
            height: ${pixelToRem(700)};
            transform-origin: 50% 50%;
            transform: scale(0.7);
            transition: all 100ms ease;

            @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
              transform: scale(.9);
              height: ${pixelToRem(800)};
            }
            
            @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
              transform: scale(1);
            }
          `}
        >
          <Wrapper
            customCss={css`
              margin-top: ${pixelToRem(-150)};
              margin-left: ${pixelToRem(-70)};
              display: flex;

              @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
                margin-top: ${pixelToRem(-120)};
                margin-left: ${pixelToRem(-50)};
                width: 100%;
              }

              @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
                align-items: center;
              }
            `}
          >
            <Bubbles />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Widgets.View>
  ), [
    path,
    searchParams,
  ]);
};

export default memo(withRouter(Home));
