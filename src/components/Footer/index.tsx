import React, { FunctionComponent } from 'react';
import { css } from 'styled-components';
import { Footer, Wrapper, Span, A, Nav } from '@bit/meema.ui-components.elements';
import { footerHeightNormal } from '../../theme/Theme';
import { pixelToRem } from 'meema.utils';

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
      >Politicas de privacidad</A>|
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

const MainFooter = () => (
  <Footer
    customCss={css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 100vw;
      color: white;
      padding: 0 2rem;
      height: ${({theme}) => pixelToRem(theme.footer.height.normal)};
      z-index: 1;
    `} 
  >
    <Nav customCss={css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    
      @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
        flex-direction: row;
      }
    `}>
      <Wrapper customCss={css`
        display: inline-flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-bottom: ${pixelToRem(10)};
      
        @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
          margin-bottom: 0;
          width: auto;
        }
      `}>
        <A
            href='https://www.greenpeace.org/argentina/terminios-y-condiciones/'
            customCss={css`
              color: white;
              text-decoration: underline;
            `}
          >Términos y condiciones</A>
        <Wrapper customCss={css`margin: 0 ${pixelToRem(9)};`}>|</Wrapper>
        <A
          href='https://www.greenpeace.org/argentina/politica-privacidad/'
          customCss={css`
            color: white;
            text-decoration: underline;
          `}
        >Politicas de privacidad</A>
      </Wrapper>
      <Span>© Greenpeace Copyright</Span>
    </Nav>
  </Footer>
);

MainFooter.displayName = 'MainFooter';
export default MainFooter;