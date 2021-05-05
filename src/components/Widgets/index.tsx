import React from 'react';
import Elements, { CustomCSSType } from "@bit/meema.ui-components.elements";
import ThreeCircles from "@bit/meema.ui-components.loaders.three-circles";
import { pixelToRem } from "meema.utils";
import styled, { css } from "styled-components";
import {GreenpeaceLogoWhite as GreenpeaceLogo} from '../../utils/icons';
import { Link, NavLinkProps } from 'react-router-dom';
import { ArrowRightIcon } from '../../utils/icons';
import { LinkProps } from 'react-scroll';

const View = styled(Elements.View)`
  position: relative;
  height: ${({theme}) => pixelToRem(window.innerHeight - theme.header.mobile.height - theme.footer.mobile.height)};
  
  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    height: ${({theme}) => pixelToRem(window.innerHeight - theme.header.tablet.height - theme.footer.tablet.height)};
  }
  
  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
    height: ${({theme}) => pixelToRem(window.innerHeight - theme.header.desktop.height - theme.footer.desktop.height)};
  }
`;

export const MainLogo = styled(Elements.A)`
  display: flex;

  &:after {
    width: ${pixelToRem(130)}; 
    height: ${pixelToRem(30)};
    background-image: url(${GreenpeaceLogo});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    content: "";
    transition: all 250ms ease;
  }

  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    &:after {
      width: ${pixelToRem(160)}; 
    }
  }
`;

export const Loader: React.FunctionComponent<{ type?: 'light' }> = ({
  type,
}) => (
  <Elements.Wrapper
    customCss={css`
      margin: 1rem 0;
    `}
  >
    <ThreeCircles
      circleCss={css`
        background-color: ${props => props.theme.color.primary.normal};

        ${(type === 'light') && css`
          background-color: white;
        `}
      `}
    />
  </Elements.Wrapper>
)

export const Overlay = styled(Elements.Wrapper)`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 999;
  cursor: pointer;
`;

interface IH1 { width?: string; fontSize?: string; textAlign?: string }
const H1 = styled(Elements.H1)<IH1>`
  color: white;
  font-size: ${props => props.fontSize ? props.fontSize : pixelToRem(32)};
  width: ${props => props.width ? props.width : 'auto'};
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
`;

interface IButtonNavLink { disabled?: boolean; format?: string; }
export const ButtonNavLink = styled(Link)<IButtonNavLink>`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: ${pixelToRem(10)} ${pixelToRem(20)};
  border-radius: ${pixelToRem(30)};
  font-size: ${pixelToRem(18)};
  color: white;
  background: ${(props) => props.theme.color.primary.normal};
  transition: all 250ms ease;

  svg {
    margin-left: ${pixelToRem(10)};
  }
  
  &:hover {
    background: ${(props) => props.theme.color.primary.dark};
  }
  
  ${({disabled}) => (disabled) && css`
    background-color: #E0E0E0;
    pointer-events: none;
    cursor: not-allowed;
  `}

  ${({format}) => (format && format === 'outlined') && css`
    padding: ${pixelToRem(4)} ${pixelToRem(25)};
    border: solid 2px white;
    background: transparent;

    &:hover {
      color: ${(props) => props.theme.color.primary.dark};
      background: white;
      border-color: ${(props) => props.theme.color.primary.dark};

      svg path {
        fill: ${(props) => props.theme.color.primary.dark};
      }
    }
  `}
  
  ${({format}) => (format && format === 'text') && css`
    background: transparent;
    
    &:hover {
      color: ${({theme}) => theme.color.primary.dark};
      background: white;
    }
  `}

  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    font-size: ${pixelToRem(24)};
    padding: ${pixelToRem(10)} ${pixelToRem(46)};
  }
`;

const Button = styled(Elements.Button)<IButtonNavLink>`
  display: inline-flex;
  align-items: center;
  padding: ${pixelToRem(10)} ${pixelToRem(46)};
  width: auto;
  border-radius: ${pixelToRem(30)};
  font-size: ${pixelToRem(24)};
  color: white;
  background: ${(props) => props.theme.color.primary.normal};
  transition: all 250ms ease;

  &:hover {
    background: ${(props) => props.theme.color.primary.dark};
  }

  &:focus {
    outline: 0;
  }
  
  ${({disabled}) => disabled && css`
    background-color: #E0E0E0;
    pointer-events: none;
    cursor: not-allowed;
  `}

  ${({format}) => (format && format === 'outlined') && css`
      background: transparent;
      font-size: ${pixelToRem(32)};
      border: solid 2px white;

      &:hover {
        color: white;
        background: ${(props) => props.theme.color.primary.dark};
      }
    `}
`;

export default {
  MainLogo,
  Overlay,
  Loader,
  View,
  Button,
  ButtonNavLink,
  H1,
}