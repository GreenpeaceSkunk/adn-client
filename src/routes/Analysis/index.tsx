import React, { memo, useEffect, useMemo } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { Wrapper, View, Header, Span } from '@bit/meema.ui-components.elements';
import { H1 } from '../../components/Elements';
import { IAnimal } from 'greenpeace';
import Animal from '../../components/Animal';
import { pixelToRem } from 'meema.utils';
import Carousel from '@bit/meema.ui-components.carousel';
import config from '../../config'; 
import { css } from 'styled-components';

const Analysis: React.FunctionComponent<{}> = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push({
        pathname: `/results`,
      });
    }, 5000);
  }, []);

  return useMemo(() => (
    <View>
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
          padding: ${pixelToRem(20)} 0 0 0;
        `}
      >
        <Carousel
          index={0}
          showControls={false}
          showIndicators={false}
          moveX={pixelToRem(230)}
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
                padding: ${pixelToRem(20)};

                & > * {
                  margin: 0 !important;
                }
              `}
            >
              <Animal key={animal.label} {...animal} />
            </Wrapper>
          ))}
        </Carousel>
      </Wrapper>
    </View>
  ), []);
}

export default memo(withRouter(Analysis));