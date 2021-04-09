import { Wrapper } from '@bit/meema.ui-components.elements';
import React, { useMemo } from 'react';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';

interface IProps {
  size?: number,
  initialScale?: number,
  initialPosX?: number,
  initialPosY?: number,
  initialPosZ?: number,
  rotateX?: number,
  translate?: number,
  animationTime?: number,
  background?: any,
  children?: React.ReactNode | HTMLAllCollection;
}

const Bubble: React.FunctionComponent<IProps> = ({
  size = 100,
  initialPosX = 0,
  initialPosY = 0,
  animationTime = 5,
  children,
}) => {
  return useMemo(() => (
    <Wrapper
      customCss={css`
        position: absolute;
        top: ${pixelToRem(initialPosY)};
        left: ${initialPosX}%;
        z-index: 1;
        transform-origin: 50% 50%;
        transition: all 100ms ease;

        @keyframes animate {
          0% {
            transform: scale(1);
          }
          
          50% {
            transform: scale(1.1);
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
    size,
    initialPosX,
    initialPosY,
    animationTime,
    children,
  ])
}

export default Bubble;