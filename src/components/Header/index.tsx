import React, { FunctionComponent } from 'react';
import { Wrapper, Header } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import { MainLogo as Logo } from '../../components/Widgets';

const MainHeader: FunctionComponent<{}> = () => (
  <Header
    customCss={css`
      display: flex;
      align-items: center;
      padding-left: ${pixelToRem(16)};
      padding-right: ${pixelToRem(16)};
      min-height: ${({theme}) => pixelToRem(theme.header.mobile.height)};
      background-color: ${({theme}) => theme.header.mobile.backgroundColor};
      transition: all 250ms ease;


      @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
        padding-left: ${pixelToRem(40)};
        padding-right: ${pixelToRem(40)};
        min-height: ${({theme}) => pixelToRem(theme.header.tablet.height)};
        background-color: ${({theme}) => theme.header.tablet.backgroundColor};
      }
      
      @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
        min-height: ${({theme}) => pixelToRem(theme.header.desktop.height)};
        background-color: ${({theme}) => theme.header.desktop.backgroundColor};
      }
    `}
  >
    <Wrapper>
      <Logo />
    </Wrapper>
  </Header>
);

export default MainHeader;