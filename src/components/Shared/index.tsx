import React from 'react';
import {GreenpeaceLogoWhite as GreenpeaceLogo} from '../../assets/icons';
import { Wrapper, Img, A } from '@bit/meema.ui-components.elements';
import ThreeCircles from '@bit/meema.ui-components.loaders.three-circles';
import { css } from 'styled-components';

export const Logo = () => (
  <A
    href='https://greenpeace.org.ar'
  >
    <Img 
      alt='Greenpeace'
      src={GreenpeaceLogo}
      style={{
        width: '10rem',
        height: 'auto',
      }}
      width='10rem'
      height='auto'
    />
  </A>
);

export const Loader: React.FunctionComponent<{ type?: 'light' }> = ({
  type,
}) => (
  <Wrapper
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
  </Wrapper>
)
