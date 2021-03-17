import React, { memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Img, Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import styled, { css } from 'styled-components';
import { IAnimal } from 'greenpeace';
import { Loader } from '../Shared';

export const Chip = styled(Wrapper)<{ chipOrientation?: string; showChipAnimation?: boolean; }>`
  /* position: absolute; */
  padding: ${pixelToRem(15)} ${pixelToRem(15)} ${pixelToRem(15)} ${pixelToRem(20)};
  font-size: ${pixelToRem(32)};
  font-family: ${props => props.theme.font.family.primary.bold};
  width: 100%;
  
  /* max-width: ${pixelToRem(160)}; */
  /* background: white; */
  /* color: ${props => props.theme.color.primary.normal}; */

  color: white;
  text-align: center;

  border-top-left-radius: ${pixelToRem(80 / 2)};
  border-top-right-radius: ${pixelToRem(80 / 2)};
  border-bottom-right-radius: ${pixelToRem(80 / 2)};
  border-bottom-left-radius: ${pixelToRem(80 / 2)};
  animation-delay: 750ms;
  /* transform: scale(0); */
  /* z-index: 99999; */

  ${(props) => (props.showChipAnimation === true) && css`
    animation: showTextAnimation 250ms forwards;
  `}

  ${(props) => (props.showChipAnimation === false) && css`
    animation: hideTextAnimation 250ms forwards;
  `}

  /* top: calc(100% + ${pixelToRem(20)}); */
  
  @keyframes showTextAnimation {
    0% {
      transform: scale(0);
    }
    
    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes hideTextAnimation {
    0% {
      transform: scale(1);
    }
    
    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(0);
    }
  }
`;

interface IProps {
  showChip?: boolean;
  chipOrientation?: 'right' | 'bottom' | 'left';
  borderRadius?: boolean;
  onClickHandler?: (value: string) => void;
}

export const Animal: React.FunctionComponent<IAnimal & IProps> = ({
  description,
  group,
  label,
  name,
  picture,
  showChip = false,
  chipOrientation = 'bottom',
  borderRadius = true,
  onClickHandler,
}) => {
  const [ image, setImage ] = useState<any>();
  const [ imageLoaded, setImageLoaded ] = useState<boolean>(false);
  const [ clicked, setClicked ] = useState<boolean>(false);
  const [ showChipAnimation, setShowChipAnimation ] = useState<boolean>(false);
 
  const onClick = useCallback(() => {
    if(onClickHandler) {
      setClicked(true);
      // const timer = setTimeout((a, b) => {
          // onClickHandler(label);
          // }, 1000);
      let tick = 0;
      const interval = setInterval(() => {
        tick++;
        setShowChipAnimation(true);

        if(tick === 5) {
          setShowChipAnimation(false);
        }
        
        if(tick === 12) {
          onClickHandler(label);
          // setShowChipAnimation(false);
          clearInterval(interval);
        }
      }, 50);

      // return () => clearTimeout(timer);
    }
  }, [
    label,
    clicked,
    showChipAnimation,
    onClickHandler,
  ])
  
  useEffect(() => {
    (async () => {
      try {
        setImageLoaded(false);
        const { default: src } = await import(`../../assets/images/animals/${picture}`);
        setImage(src);
      } catch (err) {
        console.log(`Error when loading image`);
      }
    })()
  }, [
    picture,
  ]);
  
  useEffect(() => {
    setClicked(false);
    setImageLoaded(true);
  }, [
    image,
  ]);

  return useMemo(() => (
    <>
      <Wrapper
        className={`animal__${name}`}
        customCss={css`
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          background: white url(${image});
          background-size: 100%;
          background-position: center;
          background-repeat: no-repeat;
          flex: 0 0 100%; 
          height: 100%;
          border-radius: ${borderRadius ? '50%' : '0'};
          font-size: ${pixelToRem(40)};
          transition: all 300ms ease;
          overflow: hidden;
          cursor: auto;

          ${onClickHandler && css`
            cursor: pointer;
            &:hover {
              background-size: 110%;
            }
          `}
        `}
        onClick={onClick}
      >
        {(!imageLoaded) && (
          <Loader />  
        )}
        <Wrapper 
          customCss={css`
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            height: ${clicked ? '100%' : '0%'};
            background: linear-gradient(transparent, #66CC00);
            transition: all 300ms ease;
          `}
        />
        
      </Wrapper>
      {/* {(showChip) && (
        <Chip
          chipOrientation={chipOrientation}
          showChipAnimation={showChipAnimation}
        >{name}</Chip>
      )} */}
    </>
  ), [
    description,
    group,
    label,
    name,
    picture,
    image,
    imageLoaded,
    clicked,
    showChipAnimation,
    borderRadius,
    onClickHandler,
  ]);
};

Animal.displayName = 'Animal';
export default Animal;


