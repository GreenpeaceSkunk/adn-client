import React, { memo, useMemo } from 'react';
import { P, Span, Wrapper } from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { IAnimal } from 'greenpeace';
import Animal from '../Animal';


const Component: React.FunctionComponent<{
  delay?: number;
  title?: string;
  animal: IAnimal;
}> = ({
  delay = 0,
  title,
  animal,
}) => {
  return useMemo(() => (
    <Wrapper
      customCss={css`
        display: inline-flex;
        flex-direction: column;
        flex-grow: 0;
        flex-shrink: 1;
        flex-basis: ${pixelToRem(400)};
        padding: 0 ${pixelToRem(20)};
        margin: ${pixelToRem(10)};
        text-align: center;
        opacity: 0;
        animation: sideInCard 500ms forwards ease;
        animation-delay: ${300 + delay}ms;

        @keyframes sideInCard {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-left: 0;
        }

      `}
    >
      <Span
        customCss={css`
          color: white;
          text-transform: uppercase;
          font-size: ${pixelToRem(20)};
        `}
      >{title}</Span>
      <Wrapper
        customCss={css`
          display: flex;
          align-self: center;
          width: ${pixelToRem(210)};
          height: ${pixelToRem(210)};
          margin: ${pixelToRem(20)} 0 ${pixelToRem(30)} 0;
        `}
      >
        <Animal {...animal} showChip={true} />
      </Wrapper>
      <Span></Span>
      <P
        customCss={css`
          color: white;
          font-size: ${pixelToRem(20)};
        `}
      >Básico en tus sentimientos, siempre buscás la simpleza y evitás los problemas.</P>
    </Wrapper>
  ), []);
};


export default memo(Component);
