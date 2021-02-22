import React, { memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Img, Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import styled, { css } from 'styled-components';
import { IAnimal } from 'greenpeace';

const Chip = styled(Wrapper)<{ chipOrientation?: string; }>`
  position: absolute;
  max-width: ${pixelToRem(160)};
  padding: ${pixelToRem(15)} ${pixelToRem(15)} ${pixelToRem(15)} ${pixelToRem(20)};
  font-size: ${pixelToRem(24)};
  font-family: ${props => props.theme.font.family.primary.bold};
  background: white;
  color: ${props => props.theme.color.primary.normal};
  border-top-left-radius: ${pixelToRem(80 / 2)};
  border-top-right-radius: ${pixelToRem(80 / 2)};
  border-bottom-right-radius: ${pixelToRem(80 / 2)};
  border-bottom-left-radius: ${pixelToRem(80 / 2)};
  animation: animateChip 250ms forwards;
  animation-delay: 750ms;
  transform: scale(0);
  z-index: 99999;

  ${(props => (props.chipOrientation === 'bottom') && css`
    bottom: -${pixelToRem(20)};
  `)}

  ${(props => (props.chipOrientation === 'left') && css`
    left: -${pixelToRem(160 / 2)};
    border-bottom-right-radius: 0;
  `)}
  
  ${(props => (props.chipOrientation === 'right') && css`
    right: -${pixelToRem(160 / 2)};
    border-bottom-left-radius: 0;
  `)}

  @keyframes animateChip {
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
`;

interface IProps {
  showChip?: boolean;
  chipOrientation?: 'right' | 'bottom' | 'left';
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
  onClickHandler,
}) => {
  const [ image, setImage ] = useState<any>();
  const [ clicked, setClicked ] = useState<boolean>(false);

  const onClick = useCallback(() => {
    if(onClickHandler) {
      setClicked(true);

      const timer = setTimeout(() => {
        onClickHandler(label);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    label,
    clicked,
    onClickHandler,
  ])
  
  useEffect(() => {
    (async () => {
      try {
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
  }, [
    image,
  ]);

  return useMemo(() => (
    <Wrapper
      customCss={css`
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: white url(${image});
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        flex: 0 0 100%; 
        height: 100%;
        border-radius: 50%;
        font-size: 40px;
        overflow: hidden;
        transition: all 300ms ease;
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
      <Wrapper 
        customCss={css`
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: ${clicked ? '100%' : '0%'};
          background: linear-gradient(transparent, #66CC00);
          transition: all 300ms ease;
        `}
      />
      {showChip && (
        <Chip
          chipOrientation={chipOrientation}
        >{name}</Chip>
      )}
    </Wrapper>
  ), [
    description,
    group,
    label,
    name,
    picture,
    image,
    clicked,
    onClickHandler,
  ]);
};

Animal.displayName = 'Animal';
export default Animal;


