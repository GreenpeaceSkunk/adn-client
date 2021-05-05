import React, { memo, useEffect, useMemo, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Wrapper, Header, Span } from '@bit/meema.ui-components.elements';
import Widgets from '../Widgets';
import { IAnimal } from 'greenpeace';
import Animal from '../Animal';
import { pixelToRem } from 'meema.utils';
import config from '../../config'; 
import { css } from 'styled-components';

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push({
        pathname: `/results`,
      });
    }, 5500);
    
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  return useMemo(() => (
    <Widgets.View
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Header
        customCss={css`
          padding: ${pixelToRem(25)};
          
          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
            padding: ${pixelToRem(40)};
          }
        `}
      >
        <Widgets.H1
          customCss={css`
            text-align: center !important;
            font-size: ${pixelToRem(23)} !important;

            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.mobile.minWidth)}) {
              font-size: ${pixelToRem(30)} !important;
            }
            
            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
              font-size: ${pixelToRem(40)} !important;
            }
          `}
        >Estamos analizando tu <Span customCss={css`color: white; font-family: ${props => props.theme.font.family.primary.bold};`}>ADN Greenpeace</Span>, para<br/>determinar qué animales autóctonos te representan</Widgets.H1>
      </Header>
      <Wrapper
        customCss={css`
           --circle-size: ${pixelToRem(200)};

          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            --circle-size: ${pixelToRem(300)};
          }

          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
            --circle-size: ${pixelToRem(350)};
          }

          position: relative;
          display: flex;
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: var(--circle-size);
          width: var(--circle-size);
          height: var(--circle-size);
          border-radius: 50%;
          overflow: hidden;
         
          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            margin-top: ${pixelToRem(50)};
          }
        `}
      >
        {config.animals.map((animal: IAnimal, idx: number) => (
          <Wrapper 
            key={animal.label}
            customCss={css`
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-position: center center;
              background-size: 100% 100%;
              animation-duration: 1000ms;
              animation-delay: ${idx * 500}ms;
              transition: all 150ms ease;
              opacity: 0;
              background-color: orange;
              animation-name: scannerAnimation;
              
              @keyframes scannerAnimation {
              0% {
                transform: scale(0.95);
                opacity: 0;
              }
              
              50% {
                transform: scale(1);
                opacity: 1;
              }

              100% {
                transform: scale(0.95);
                opacity: 1;
              }
            }

            `}
          >
            <Animal
              key={animal.label}
              borderRadius={false}
              {...animal}
            />
          </Wrapper>
        ))}
      </Wrapper>
    </Widgets.View>
  ), []);
}

Component.displayName = 'ScannerView'
export default memo(withRouter(Component));