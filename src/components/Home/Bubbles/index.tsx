import Wrapper from '@bit/meema.ui-components.elements';
import React from 'react';
import { css } from 'styled-components';
import { pixelToRem } from 'greenpeace-ui-themes';
import { backgroundImage } from '../../../styles/mixins';
// import { BackgroundHome } from '../../../lib/images';

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
}

const Bubble: React.FunctionComponent<IProps> = ({
  size = 100,
  initialScale = 1,
  initialPosX = 0,
  initialPosY = 0,
  initialPosZ = 0,
  rotateX = 0,
  translate = 0,
  animationTime = 5,
  background,
}) => {
  /* transform: rotateX(${rotateX}deg) translateX(${pixelToRem(initialPosX)}) translateY(${pixelToRem(initialPosY)}) translateZ(${pixelToRem(initialPosZ)}); */
  return (
    <Wrapper
      customCss={css`
        position: absolute;
        top: ${pixelToRem(initialPosY)};
        /* left: ${pixelToRem(initialPosX)}; */
        left: ${initialPosX}%;
        width: ${pixelToRem(size)};
        height: ${pixelToRem(size)};
        border-radius: 50%;
        background-color: white;
        animation: animate ${animationTime}s infinite;
        z-index: 1;
        ${backgroundImage(background)};

        /* @keyframes animate {
          0% {
            top: ${pixelToRem(initialPosY)};
            left: ${pixelToRem(initialPosX)};
          }
          
          50% {
            top: ${pixelToRem(initialPosY + translate)};
            left: ${pixelToRem(initialPosX + translate)};
          }

          100% {
            top: ${pixelToRem(initialPosY)};
            left: ${pixelToRem(initialPosX)};
          }
        } */
      `}
    >

    </Wrapper>
  )
}

export default Bubble;