import React, { memo, useContext, useMemo } from 'react';
import { useRouteMatch, withRouter } from 'react-router';
import { Wrapper, H1, View } from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { AppContext } from '../App/context';
import { pixelToRem } from 'meema.utils';
import Animal from '../Animal';
import config from '../../config';
import { ButtonNavLink } from '../Elements';

interface IBubble { 
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  color?: string;
  children: React.ReactNode | HTMLAllCollection;
}

const Bubble: React.FunctionComponent<IBubble> = ({
  width = 100,
  height = 100,
  x = 0,
  y = 0,
  color = 'white',
  children,
}) => {
  return useMemo(() => (
    <Wrapper
      customCss={css`
        position: absolute;
        width: ${pixelToRem(width)};
        height: ${pixelToRem(height)};
        left: ${pixelToRem(x)};
        top: ${pixelToRem(y)};
        background-color: ${color};
        border-radius: 50%;
        overflow: hidden;
        animation-delay: ${Math.random() * 3}s;
        animation-name: animate-bubbles;
        animation-duration: ${Math.round(Math.random() * 5)}s;
        animation-iteration-count: infinite;

        img {
          width: 100%;
          height: auto;
        }
        
        @keyframes animate-bubbles {
          0% {
            transform: scale(1);
            
          }
          
          50% {
            transform: scale(${1.05});
          }

          100% {
            transform: scale(1);
          }
        }
      `}
    >
      {children}
    </Wrapper>
  ), [
    width,
    height,
    x,
    y,
    color,
    children,
  ])
};
Bubble.displayName = 'Bubble';

const Bubbles = () => (
  <Wrapper
    customCss={css`
      position: relative;
      display: flex;
      width: ${pixelToRem(868)};
      height: ${pixelToRem(900)};
    `}
  >
    <Bubble x={562} y={-90} width={382} height={382}>
      <Animal {...config.animals[2]} showChip={true} />
    </Bubble>
    <Bubble x={653} y={498} width={302} height={302}>
      <Animal {...config.animals[1]} showChip={true} />
    </Bubble>
    <Bubble x={82} y={670} width={200} height={200}>
      <Animal {...config.animals[3]} showChip={true} />
    </Bubble>
    <Bubble x={344} y={674} width={322} height={322}>
      <Animal {...config.animals[9]} showChip={true} />
    </Bubble>
    <Bubble x={182} y={131} width={295} height={295}>
      <Animal {...config.animals[0]} showChip={true} />
    </Bubble>
    <Bubble x={476} y={354} width={200} height={200}>
      <Animal {...config.animals[5]} showChip={true} />
    </Bubble>
    <Bubble x={379} y={-25} width={155} height={155}>
      <Animal {...config.animals[8]} showChip={true} />
    </Bubble>
    <Bubble x={0} y={397} width={250} height={250}>
      <Animal {...config.animals[4]} showChip={true} />
    </Bubble>
    <Bubble x={293} y={500} width={170} height={170}>
      <Animal {...config.animals[6]} showChip={true} />
    </Bubble>
    <Bubble x={705} y={319} width={140} height={140}>
      <Animal {...config.animals[7]} showChip={true} />
    </Bubble>
  </Wrapper>
);

const Home: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { path } = useRouteMatch();
  
  return useMemo(() => (
    <View
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
          padding: ${pixelToRem(40)};
          z-index: 99;
          width: 100%;
          transition: all 250ms ease;

          @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
            padding-right: 0;
            width: 40%;
          }
        `}
      >
        <H1
          customCss={css`
            color: white;
            font-size: ${pixelToRem(40)};

            @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
              font-size: ${pixelToRem(58)};
            }
          `}
        >Descubrí a qué animal autóctono te parecés más</H1>
        <ButtonNavLink to='/registration' style={{marginTop: pixelToRem(30)}}>Comenzar</ButtonNavLink>
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
    </View>
  ), [
    path,
    searchParams,
  ]);
};

export default memo(withRouter(Home));
