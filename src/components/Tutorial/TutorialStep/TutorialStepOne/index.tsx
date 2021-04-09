import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { IAnimal } from 'greenpeace';
import { Wrapper, View, Header } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import { H1 } from '../../../Elements';
import Animal from '../../../Animal';
import config from '../../../../config'; 

const TutorialStepOne: React.FunctionComponent<{}> = () => {
  const sliderRef = useRef<React.ReactNode | HTMLAllCollection | any>();
  const [ sliderWidth, setSliderWidth ] = useState<number>(0);

  useEffect(() => {
    if(sliderRef) {
      const lastChild = sliderRef.current.children[sliderRef.current.children.length - 1];
      setSliderWidth(lastChild.getBoundingClientRect().x + lastChild.getBoundingClientRect().width - sliderRef.current.getBoundingClientRect().width);
    }
  }, [
    sliderRef,
  ])

  return useMemo(() => (
    <View>
      <Header
        customCss={css`
          padding: ${pixelToRem(40)} ${pixelToRem(40)} ${pixelToRem(40)} ${pixelToRem(40)};
        `}
      >
        <H1
          customCss={css`
            width: 100% !important;
            font-size: ${pixelToRem(32)} !important;
            font-family: ${({theme}) => theme.font.family.primary.bold};
            text-align: justify;
          `}
        >A continuación te mostraremos imágenes de animales.<br/>Para cada dupla, hace click en el animal con el que más te identifiques.</H1>
      </Header>
      <Wrapper
        customCss={css`
          margin: ${pixelToRem(50)} 0;
          position: relative;
        `}
      >
        <Wrapper
          ref={sliderRef}
          className='slider'
          customCss={css`
            display: flex;
            animation-duration: 14s;
            animation-iteration-count: infinite;
            animation-delay: 1s;
            transition: all 250ms ease;
            transform: translateX(${pixelToRem(40)});
            animation-timing-function: linear;

            ${(sliderWidth !== 0) && css`
              animation-name: move-x;
            `}

            @keyframes move-x {
              0% {
                transform: translateX(${pixelToRem(40)});
              }

              50% {
                opacity: 1;
                transform: translateX(${pixelToRem(-sliderWidth)});
              }
              
              100% {
                opacity: 1;
                transform: translateX(${pixelToRem(40)});
              }
            }
          `}
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
        </Wrapper>
      </Wrapper>
    </View>
  ), [
    sliderRef,
    sliderWidth,
  ]);
};

export default memo(TutorialStepOne);
