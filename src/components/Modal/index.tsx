import React, { memo, useCallback, useMemo } from 'react';
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
  z-index: 99999;
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
    history.goBack();
  }, [
    history,
  ])
  
  return useMemo(() => (
    <>
      <Wrapper
        customCss={css`
          position: fixed;
          display: fixed;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 9999;
          /* pointer-events: none; */
        `}
      >
        <Wrapper
          customCss={css`
            position: relative;
            background-color: white;
            border-radius: ${pixelToRem(20)};
            padding: ${pixelToRem(40)};
            width: 90vw;
            transition: all 250ms ease;

            @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
              width: auto;
            }
            ${customCss};
          `}
        >
          <XCloseButton
            onClick={goBack}
          >
            <Img src={XCloseIcon} />
          </XCloseButton>
          <Wrapper>
            {children}
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Overlay
        onClick={goBack}
      />
    </>
  ), [
    children,
    history,
    path,
  ]);
};

Component.displayName = 'Modal';
export default memo(Component);
