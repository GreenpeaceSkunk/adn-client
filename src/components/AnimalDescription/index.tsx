import React, { memo, Suspense, useContext, useEffect, useMemo, useState } from 'react';
import {useParams, withRouter } from 'react-router-dom';
import { Loader } from '../Shared';
import config from '../../config';
import { Wrapper, Img, P, H1 } from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { IAnimal } from 'greenpeace';
const Modal = React.lazy(() => import('../Modal'));

interface IProps {}

const Component: React.FunctionComponent<IProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [ animal, setAnimal ] = useState<IAnimal | null>(null);
  const [ image, setImage ] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { default: src } = await import(`../../assets/images/animals/${animal?.picture}`);
        setImage(src);
      } catch (err) {
        console.log(`Error when loading image`);
      }
    })()
  }, [
    animal,
  ]);

  useEffect(() => {
    setAnimal(config.animals.filter((a: IAnimal) => a.label === id)[0]);
  }, [
    id,
  ]);

  return useMemo(() => (
    <Suspense fallback={<Loader />}>
      <Modal
        customCss={css`
          padding: ${pixelToRem(60)} ${pixelToRem(40)};
          
          @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
            padding-left: ${pixelToRem(69)};
            padding-right: ${pixelToRem(69)};
          }
        `}
      >
        <Wrapper
          customCss={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            transition: all 200ms ease;

            @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
              flex-direction: row;
              padding: 0 ${pixelToRem(20)};
              width: 50vw;
            }
          `}
        >
          <Img 
            customCss={css`
              width: ${pixelToRem(210)};
              height: ${pixelToRem(210)};
              border-radius: 50%;
              background: grey;
              align-self: center;
            `}
            src={`${image}`}
          />
          <Wrapper
            customCss={css`
              @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
                margin-left: ${pixelToRem(66)};
              }
            `}>
            <H1 
              customCss={css`
                margin-bottom: ${pixelToRem(20)};
                margin-top: ${pixelToRem(20)};
                font-family: ${({theme}) => theme.font.family.primary.bold}; 
                color: ${({theme}) => theme.color.primary.dark};
                text-align: center;

                @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
                  margin-top: 0;
                }
            `}>{animal?.name}</H1>
            <P
              customCss={css`
                text-align: center;

                @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
                  text-align: left;
                }
              `}
            >{animal?.description}</P>
          </Wrapper>
        </Wrapper>
      </Modal>
    </Suspense>
  ), [
    id,
    image,
    animal,
  ]);
}

export default memo(withRouter(Component));