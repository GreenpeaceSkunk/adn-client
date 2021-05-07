import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { IAnimal } from 'greenpeace';
import { Wrapper, View, Header } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Widgets from '../../../Widgets';
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
    <Wrapper
      customCss={css`
        --animal-circle: ${pixelToRem(180)};
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.mobile.minWidth)}) {
          --animal-circle: ${pixelToRem(220)};
        }

        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          --animal-circle: ${pixelToRem(300)};
        }

        width: 100%;
        margin-top: 0;
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          margin-top: ${pixelToRem(30)};
        }
      `}
    >
      <Header
        customCss={css`
          padding: ${pixelToRem(20)};

          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            padding: ${pixelToRem(40)}
          }
        `}
      >
        <Widgets.H1
          customCss={css`
            width: 100% !important;
            font-size: ${pixelToRem(18)} !important;
            font-family: ${({theme}) => theme.font.family.primary.bold};
            text-align: justify;

            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.mobile.minWidth)}) {
              font-size: ${pixelToRem(24)} !important;
            }

            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              line-height: 130%;
              font-size: ${pixelToRem(32)} !important;
            }
          `}
        >A continuación te mostraremos imágenes de animales.<br/>Hace click en siguiente y elegí con cuál (o qué) animal te identificás más.
        </Widgets.H1>
        {children}
      </Header>
      <Wrapper
        customCss={css`
          position: relative;

          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            height: ${pixelToRem(400)};
          }
        `}
      >
        <Wrapper
          ref={sliderRef}
          className='slider'
          customCss={css`
            display: flex;
            align-items: center;
            animation-duration: 28s;
            animation-iteration-count: infinite;
            animation-delay: 1s;
            transition: all 250ms ease;
            transform: translateX(${pixelToRem(40)});
            animation-timing-function: linear;
            height: 100%;

            ${(sliderWidth !== 0) && css`
              animation-name: move-x;
            `}

            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              animation-duration: 14s;
            }

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
                flex-shrink: 0;
                flex-grow: 1;
                /* flex-basis: ${pixelToRem(190)};
                width: ${pixelToRem(190)};
                height: ${pixelToRem(190)}; */
                
                flex-basis: var(--animal-circle);
                width: var(--animal-circle);
                height: var(--animal-circle);
                margin-right: ${pixelToRem(30)};

                @media (min-width: ${({theme}) => pixelToRem(theme.responsive.mobile.minWidth)}) {
                  /* flex-basis: ${pixelToRem(220)};
                  width: ${pixelToRem(220)};
                  height: ${pixelToRem(220)}; */
                }

                @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                  /* flex-basis: ${pixelToRem(300)};
                  width: ${pixelToRem(300)};
                  height: ${pixelToRem(300)}; */
                }
              `}
            >
              <Animal {...animal} />
            </Wrapper>
          ))}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  ), [
    sliderRef,
    sliderWidth,
  ]);
};

export default memo(TutorialStepOne);
