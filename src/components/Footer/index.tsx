import React from 'react';
import styled, { css } from 'styled-components';
import { Footer, Wrapper, Span, A, Nav } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';

const Link = styled(A)`
  color: white;
  text-decoration: underline;
  margin-bottom: ${pixelToRem(5)};

  @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
    margin-bottom: 0;
  }
`;

const MainFooter: React.FunctionComponent<{}> = () => (
  <Footer
    customCss={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100vw;
      color: white;
      height: ${({theme}) => pixelToRem(theme.footer.height.small)};
      z-index: 1;

      @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
        height: ${({theme}) => pixelToRem(theme.footer.height.large)};
        padding-top: 0;
        padding-left: ${pixelToRem(40)};
        padding-right: ${pixelToRem(40)}; 
      }
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
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-bottom: ${pixelToRem(10)};
      
        @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
          flex-direction: row;
          margin-bottom: 0;
          width: auto;
        }
      `}>
        <Link
          href='https://www.greenpeace.org/argentina/terminios-y-condiciones/'
        >Términos y condiciones</Link>
        <Wrapper 
          customCss={css`
            margin: 0 ${pixelToRem(9)};
            display: none;

            @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
              display: block;
            }
          `}>|</Wrapper>
        <Link
          href='https://www.greenpeace.org/argentina/politica-privacidad/'
        >Politicas de privacidad</Link>
      </Wrapper>
      <Span>© Greenpeace Copyright</Span>
    </Nav>
  </Footer>
);

MainFooter.displayName = 'MainFooter';
export default MainFooter;