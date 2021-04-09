import React, { memo, useEffect, useMemo, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Wrapper, View, Header, Span } from '@bit/meema.ui-components.elements';
import { H1 } from '../Elements';
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
        flex: 0 0 ${pixelToRem(300)};
        height: ${pixelToRem(300)};
        opacity: 0;
        animation-duration: 1000ms;
        animation-delay: ${delay * 500}ms;
        transition: all 150ms ease;
        z-index: 0;
  
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
    setTimeout(() => {
      history.push({
        pathname: `/results`,
      });
    }, 5500);
  }, []);

  return useMemo(() => (
    <View
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Header
        customCss={css`
          padding: ${pixelToRem(40)};
        `}
      >
        <H1
          textAlign='center'
        >Estamos analizando tu <Span customCss={css`font-family: ${props => props.theme.font.family.primary.bold};`}>ADN Greenpeace</Span>, para<br/>determinar qué animales autóctonos te representan</H1>
      </Header>
      <Wrapper
        customCss={css`
          position: relative;
          display: flex;
          width: ${pixelToRem(300)};
          height: ${pixelToRem(300)};
          overflow: hidden;
          margin-top: ${pixelToRem(50)};
          border-radius: 50%;
          /* background-color: yellow; */
        `}
      >
        {config.animals.map((animal: IAnimal, idx: number) => (
          <Fade key={idx} animal={animal} delay={idx + 1}/>
        ))}
      </Wrapper>
    </View>
  ), []);
}

Component.displayName = 'ScannerView'
export default memo(withRouter(Component));