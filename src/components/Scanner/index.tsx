import React, { memo, useEffect, useMemo, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Wrapper, View, Header, Span } from '@bit/meema.ui-components.elements';
import Widgets from '../Widgets';
import { IAnimal } from 'greenpeace';
import Animal from '../Animal';
import { pixelToRem } from 'meema.utils';
import config from '../../config'; 
import { css } from 'styled-components';

const Fade: React.FunctionComponent<{ delay: number, animal: IAnimal }> = ({
  delay = 1,
  animal,
}) => {
  const [animate, setAnimate] = useState<boolean>(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if((current % (10 + delay)) === 0) {
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return useMemo(() => (
    <Wrapper 
      key={animal.label}
      className={`${animate ? 'animate' : ''}`}
      customCss={css`
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        flex-grow: 0;
        flex-basis: ${pixelToRem(200)};
        width: ${pixelToRem(200)};
        height: ${pixelToRem(200)};
        opacity: 0;
        animation-duration: 1000ms;
        animation-delay: ${delay * 500}ms;
        transition: all 150ms ease;
        z-index: 0;
        overflow: hidden;

        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          flex-basis: ${pixelToRem(300)};
          width: ${pixelToRem(300)};
          height: ${pixelToRem(300)};
        }
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
          flex-basis: ${pixelToRem(400)};
          width: ${pixelToRem(400)};
          height: ${pixelToRem(400)};
        }
  
        &.animate {
          animation-name: scanner-animation;
        
          @keyframes scanner-animation {
            0% {
              transform: scale(1);
            }
            
            50% {
              transform: scale(1.05);
              opacity: 1;
            }

            100% {
              transform: scale(1);
              opacity: 0;
            }
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
  ), [
    delay,
    animal,
    animate,
  ]
)};
Fade.displayName = 'Fade';

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
          position: relative;
          display: flex;
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: ${pixelToRem(200)};
          width: ${pixelToRem(200)};
          height: ${pixelToRem(200)};
          overflow: hidden;
          border-radius: 50%;
         
          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            margin-top: ${pixelToRem(50)};
            flex-basis: ${pixelToRem(300)};
            width: ${pixelToRem(300)};
            height: ${pixelToRem(300)};
          }
          
          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
            flex-basis: ${pixelToRem(350)};
            width: ${pixelToRem(350)};
            height: ${pixelToRem(350)};
          }
        `}
      >
        {config.animals.map((animal: IAnimal, idx: number) => (
          <Fade key={idx} animal={animal} delay={idx + 1}/>
        ))}
      </Wrapper>
    </Widgets.View>
  ), []);
}

Component.displayName = 'ScannerView'
export default memo(withRouter(Component));