import React from 'react';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
interface IProps {
  size?: number;
  initialPosX?: number;
  initialPosY?: number;
  animationTime?: number;
  children: React.ReactNode | HTMLAllCollection;
}

const Bubble: React.FunctionComponent<IProps> = ({
  size = 100,
  initialPosX = 0,
  initialPosY = 0,
  animationTime = 4,
  children,
}) => {
  return (
    <Wrapper
      customCss={css`
        position: absolute;
        top: ${pixelToRem(initialPosY)};
        left: ${initialPosX}%;
        width: ${pixelToRem(size)};
        height: ${pixelToRem(size)};
        animation: animate ${animationTime + Math.random()}s infinite;
        animation-delay: ${Math.random() * 2};
        z-index: 0;
        display: flex;

        & > * {
          flex-basis: 100% !important;
          height: 100% !important;
          margin: 0 !important;
        }

        @keyframes animate {
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
  )
}

export default Bubble;