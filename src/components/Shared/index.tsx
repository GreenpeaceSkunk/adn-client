import React from 'react';
<<<<<<< HEAD
import {GreenpeaceLogoWhite as GreenpeaceLogo} from '../../assets/icons';
=======
import {GreenpeaceLogoWhite as GreenpeaceLogo} from '../../lib/icons';
>>>>>>> Re-install external libraries and implement Theme
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

export const Loader = () => (
  <Wrapper
    customCss={css`
      margin: 1rem 0;
    `}
  >
    <ThreeCircles 
      circleCss={css`
        background-color: ${props => props.theme.color.primary.normal};
      `}
    />
  </Wrapper>
)
