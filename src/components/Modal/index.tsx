import React, { memo, useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useRouteMatch } from 'react-router';
import { Wrapper, Img } from '@bit/meema.ui-components.elements';
import { Overlay } from '../Elements';
import styled, { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { XCloseIcon } from '../../assets/images';
import { CustomCSSType } from '@bit/meema.ui-components.elements/dist/types';

const XCloseButton = styled(Wrapper)`
  position: absolute;
  top: ${pixelToRem(20)};
  right: ${pixelToRem(20)};
  z-index: 9999999;
  cursor: pointer;
`;

interface IProps {
  children?: React.ReactNode | HTMLAllCollection;
  customCss?: CustomCSSType;
}

const Component: React.FunctionComponent<IProps> = ({
  children,
  customCss,
}) => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const goBack = useCallback(() => {
    console.log('goback')
    history.goBack();
  }, [
    history,
  ]);
  
  return useMemo(() => (
    <>
      {ReactDOM.createPortal(
        <>
          <Overlay
            onClick={goBack}
          />
          <Wrapper
            customCss={css`
              position: fixed;
              display: flex;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              justify-content: center;
              align-items: center;
              z-index: 999;
              pointer-events: none;
            `}
          >
            <Wrapper
              customCss={css`
                position: relative;
                background-color: white;
                border-radius: ${pixelToRem(20)};
                padding: ${pixelToRem(40)};
                width: 90%;
                pointer-events: auto;
                transform-origin: 50% 50%;
                animation-name: show-modal;
                animation-duration: 250ms;
                transition: all 250ms ease;

                @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
                  width: ${pixelToRem(500)};
                }
                ${customCss};

                @keyframes show-modal {
                  0% {
                    transform: scale(0);
                  }

                  100% {
                    transform: scale(1);
                  }
                }
              `}
            >
              <XCloseButton
                onClick={goBack}
              >
                <Img src={XCloseIcon} />
              </XCloseButton>
              {children}
            </Wrapper>
          </Wrapper>
        </>,
        document.body,
      )}
    </>
  ), [
    children,
    history,
    path,
  ]);
};

Component.displayName = 'Modal';
export default memo(Component);
