import React, { FunctionComponent } from 'react';
import { Wrapper, Header } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import { Logo } from '../../components/Shared';

const MainHeader: FunctionComponent<{}> = () => (
  <Header
    customCss={css`
      display: flex;
      align-items: center;
      height: ${({theme}) => pixelToRem(theme.header.height.normal)};
      padding: 0 2rem;
    `}
  >
    <Wrapper>
      <Logo />
    </Wrapper>
  </Header>
);

export default MainHeader;