import React, { memo, useMemo } from 'react';
import { IAnimal } from 'greenpeace';
import { Wrapper, View, Header } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import styled, { css } from 'styled-components';
import Carousel from '@bit/meema.ui-components.carousel';
import { H1 } from '../../../Elements';
import Animal from '../../../Animal';
import config from '../../../../config'; 

const TutorialStepOne: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <View>
      <Header
        customCss={css`
          padding: ${pixelToRem(40)} ${pixelToRem(40)} ${pixelToRem(40)} ${pixelToRem(40)};
        `}
      >
        <H1 width='80%'>A continuación te mostraremos imágenes de animales.<br/>Para cada dupla, hace click en el animal con el que más te identifiques.</H1>
      </Header>
      <Wrapper
        customCss={css`
          padding: ${pixelToRem(10)} 0 ${pixelToRem(60)} 0;
        `}
      >
        <Carousel
          index={0}
          showControls={false}
          showIndicators={false}
          moveX={pixelToRem(280)}
          autoSlide={true}
          infinite={true}
          delay={1500}
        >
          

          {config.animals.map((animal: IAnimal) => (
            <Wrapper
              key={animal.label}
              customCss={css`
                display: flex;
                flex: 1 0 ${pixelToRem(300)};
                height: ${pixelToRem(300)};
                margin-right: ${pixelToRem(30)};
              `}
            >
              <Animal {...animal} />
            </Wrapper>
          ))}
        </Carousel>
      </Wrapper>
    </View>
  ), [
  ]);
};

export default memo(TutorialStepOne);
