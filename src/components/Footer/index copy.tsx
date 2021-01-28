import React, { FunctionComponent } from 'react';
import { css } from 'styled-components';
import { Footer, Wrapper, Span, A } from '@bit/meema.ui-components.elements';
import { pixelToRem, footerHeightNormal } from 'greenpeace-ui-themes';
import { Logo } from '../../components/Shared';
import { PeopleIcon } from '../../lib/icons';
import SocialMediaNavs from '../SocialMediaNav';
import { alignMiddle } from '../../styles/mixins';

const FooterWrapper: FunctionComponent<{
  children: React.ReactNode | HTMLAllCollection;
  height?: number;
  justifyContent?: string;
}> = ({
  children,
  height = footerHeightNormal,
  justifyContent = 'space-between',
}) => (
  <Footer
    customCss={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: ${justifyContent};
      min-height: ${pixelToRem(height)};
      width: 100vw;
      background: ${props => props.theme.color.primary.dark};
      color: white;
    `} 
  >
    { children }
  </Footer>
);

const BottomContent = () => (
  <Wrapper
    customCss={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 6rem;
      width: 100%;
      padding-top: 2rem;

      @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
        flex-direction: row;
        justify-content: space-between;
        padding-top: 0;
        padding-left: 2rem;
        padding-right: 2rem;
      }
    `}
  >
    <Logo />
    <Span
      customCss={css`
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 1rem 0;
        margin-top: 1rem;
        background: ${props => props.theme.color.secondary.normal};

        @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
          padding: 0;
          margin-top: 0;
          background: transparent;
          width: auto;
        }
      `}
    >
      <A
        href='https://www.greenpeace.org/argentina/politica-privacidad/'
        customCss={css`
          color: white;
          text-decoration: underline;
        `}
      >Politicas de privacidad</A>
    </Span>
  </Wrapper>
)

export const TinyFooter = () => (
  <FooterWrapper
    height={80}
   justifyContent='center'
  >
    <BottomContent />
  </FooterWrapper>
);

const MainFooter = () => (
  <FooterWrapper>
    <Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
      `}
    >
      <Wrapper
        customCss={css`
          width: ${pixelToRem(85)};
          height: ${pixelToRem(85)};
          border-radius: 50%;
          background: ${(props) => props.theme.color.primary.normal};
          margin-top: -${pixelToRem(85 / 2)};
          margin-bottom: 1rem;
          ${alignMiddle};
        `}
      >
        <img src={PeopleIcon} alt='Greenpeace' />
      </Wrapper>
      <Span customCss={css`
        font-size: ${pixelToRem(24)};
        margin-bottom: 1rem;
      `}>¡COMPARTÍ!</Span>
      <SocialMediaNavs />
      <Span
        customCss={css`
          text-align: center;
          width: 100%;
          margin-top: 1rem;
          font-size: ${pixelToRem(14)};
        `}
      >NUESTRO PLANETA NECESITA MÁS PERSONAS COMO VOS</Span>
    </Wrapper>
    <BottomContent />
  </FooterWrapper>
);

MainFooter.displayName = 'MainFooter';
export default MainFooter;