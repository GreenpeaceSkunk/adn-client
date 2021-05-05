import { Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import React, { useMemo } from 'react';
import { css } from 'styled-components';
import Animal from '../../Animal';
import config from '../../../config';

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

const Component: React.FunctionComponent<{}> = () => {
  return (
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
  )
}

Component.displayName = 'Bubbles';
export default Component;