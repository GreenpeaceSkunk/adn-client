import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useRouteMatch } from 'react-router';
import { Wrapper, Img } from '@bit/meema.ui-components.elements';
import { Overlay } from '../Widgets';
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
  allowGoBack?: boolean;
}

const Component: React.FunctionComponent<IProps> = ({
  children,
  customCss,
  allowGoBack = true,
}) => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const goBack = useCallback(() => {
    if(allowGoBack) {
      history.goBack();
    } else {
      history.push('/');
    }
  }, [
    history,
    allowGoBack,
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
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: ${pixelToRem(20)};
                padding: ${pixelToRem(40)} ${pixelToRem(40)};
                width: 90%;
                transform-origin: 50% 50%;
                animation-name: show-modal;
                animation-duration: 250ms;
                transition: all 250ms ease;
                pointer-events: auto;
                background-color: white;

                @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
                  width: auto;
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
    allowGoBack,
    history,
    path,
  ]);
};

Component.displayName = 'Modal';
export default memo(Component);
