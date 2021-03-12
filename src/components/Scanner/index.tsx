import React, { memo, useEffect, useMemo } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { Wrapper, View, Header, Span } from '@bit/meema.ui-components.elements';
import { H1 } from '../Elements';
import { IAnimal } from 'greenpeace';
import Animal from '../Animal';
import { pixelToRem } from 'meema.utils';
import Carousel from '@bit/meema.ui-components.carousel';
import config from '../../config'; 
import { css } from 'styled-components';

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      console.log('Ir a results')
      history.push({
        pathname: `/results`,
      });
    }, 3500);
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
          align-self: center;
          justify-self: center;
          width: ${pixelToRem(300)};
          overflow: hidden;
          margin-top: ${pixelToRem(50)};
          border-radius: 50%;
        `}
      >
        <Carousel
          index={0}
          showControls={false}
          showIndicators={false}
          moveX={pixelToRem(300)}
          autoSlide={true}
          infinite={true}
          delay={300}
        >
          {config.animals.map((animal: IAnimal) => (
            <Wrapper 
              key={animal.label}
              customCss={css`
                /* filter: blur(${pixelToRem(10)}); */
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 0 0 ${pixelToRem(300)};
                height: ${pixelToRem(300)};

                & > * {
                  margin: 0 !important;
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
        </Carousel>
      </Wrapper>
    </View>
  ), []);
}

Component.displayName = 'ScannerView'
export default memo(withRouter(Component));