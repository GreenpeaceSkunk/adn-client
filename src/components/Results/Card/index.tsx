import React, { memo, useMemo } from 'react';
import { P, Span, Wrapper } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { IAnimal } from 'greenpeace';
import Animal from '../../Animal';
import { NavLink, useRouteMatch } from 'react-router-dom';

const NavLinkButton = styled(NavLink)`
  padding: ${pixelToRem(15)} ${pixelToRem(20)}; 
  background: white;
  font-size: ${pixelToRem(20)};
  font-family: ${({theme}) => theme.font.family.primary.bold};
  color: ${props => props.theme.color.primary.dark};
  border-radius: ${pixelToRem(30)};
  margin-top: ${pixelToRem(-35)};
  margin-bottom: ${pixelToRem(20)};
  z-index: 1;
  pointer-events: none;

  @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
    pointer-events: auto;
  }
`;

const NavLinkButtonText = styled(NavLink)`
  font-size: ${pixelToRem(16)};
  font-family: ${({theme}) => theme.font.family.primary.bold};
  color: ${props => props.theme.color.primary.normal};
  margin-top: ${pixelToRem(15)};

  @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
    display: none;
  }
`;

const Component: React.FunctionComponent<{
  delay?: number;
  title?: string;
  animal: IAnimal;
  cardType: 'thought' | 'feeling' | 'energy';
}> = ({
  delay = 0,
  title,
  animal,
  cardType,
}) => {
  const { path } = useRouteMatch();

  return useMemo(() => (
    <Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 1;
        flex-basis: ${pixelToRem(400)};
        justify-content: center;
        padding: 0 ${pixelToRem(20)};
        text-align: center;
        opacity: 0;
        width: 100%;
        animation: sideInCard 500ms forwards ease;
        animation-delay: ${300 + delay}ms;
        margin-bottom: ${pixelToRem(50)};
        transition: all 250ms ease;

        &:last-child {
          margin-bottom: 0;
        }

        @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
          margin-bottom: 0;
        }

        @keyframes sideInCard {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
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
          width: ${pixelToRem(210)};
          height: ${pixelToRem(210)};
          margin: ${pixelToRem(20)} 0;
          border-radius: 50%;
        `}
      >
        <Animal
          {...animal}
          showChip={true}
        />
      </Wrapper>
      <NavLinkButton to={`${path}/animal/${animal.label}`}>
        {animal.name}
      </NavLinkButton>
      <P
        customCss={css`
          width: 80%;
          margin-top: ${pixelToRem(10)};
          color: white;
          font-size: ${pixelToRem(20)};
          font-family: ${({theme}) => theme.font.family.primary.bold};
        `}
      >{animal[cardType]}</P>
      <NavLinkButtonText to={`${path}/animal/${animal.label}`}>
        VER MÁS
      </NavLinkButtonText>
    </Wrapper>
  ), [
    delay,
    title,
    animal,
    cardType,
    path,
  ]);
};


export default memo(Component);
