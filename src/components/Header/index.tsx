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
      height: 5rem;
      padding: 0 2rem;

      @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {}
    `}
  >
    <Wrapper>
      <Logo />
    </Wrapper>
  </Header>
);

export default MainHeader;