import Elements from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { pixelToRem, CustomCSSType } from 'meema.utils';
import { Link } from 'react-router-dom';

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
export const H1 = styled(Elements.H1)<IH1>`
  color: white;
  font-size: ${props => props.fontSize ? props.fontSize : pixelToRem(32)};
  width: ${props => props.width ? props.width : 'auto'};
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
`;

interface IButtonNavLink { disabled?: boolean; format?: string; customCss?: CustomCSSType }
export const ButtonNavLink = styled(Link)<IButtonNavLink>`
  display: inline-flex;
  align-items: center;
  padding: ${pixelToRem(10)} ${pixelToRem(46)};
  width: fit-content;
  border-radius: ${pixelToRem(30)};
  font-size: ${pixelToRem(24)};
  color: white;
  background: ${(props) => props.theme.color.primary.normal};
  transition: all 250ms ease;

  svg {
    margin-left: ${pixelToRem(10)};
  }

  &:hover {
    background: ${(props) => props.theme.color.primary.dark};
  }
  
  ${props => props.disabled && css`
    background-color: #E0E0E0;
    pointer-events: none;
    cursor: not-allowed;
  `}

  ${props => (props.format && props.format === 'outlined') && css`
    background: transparent;
    border: solid 2px white;

    &:hover {
      color: ${(props) => props.theme.color.primary.dark};
      background: white;
      border-color: ${(props) => props.theme.color.primary.dark};

      svg path {
        fill: ${(props) => props.theme.color.primary.dark};
      }
    }
  `}
  
  ${props => (props.format && props.format === 'text') && css`
    background: transparent;

    &:hover {
      color: ${(props) => props.theme.color.primary.dark};
      background: white;
    }
  `}

  ${({customCss}) => customCss};
`;

export const Button = styled(Elements.Button)<IButtonNavLink>`
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
  
  ${props => props.disabled && css`
    background-color: #E0E0E0;
    pointer-events: none;
    cursor: not-allowed;
  `}

  ${props => (props.format && props.format === 'outlined') && css`
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
  Overlay,
  H1,
  Button,
  ButtonNavLink,
};
