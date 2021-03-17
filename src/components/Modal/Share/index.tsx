import React, { memo, Suspense, useContext, useMemo } from 'react';
import {withRouter } from 'react-router-dom';
import { Loader } from '../../Shared';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import { Nav, H1, Wrapper } from '@bit/meema.ui-components.elements';
import { 
  WhatsappLogo,
  FacebookLogo,
  TwitterLogo,
  EmailLogo,
} from '../../../assets/icons';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { ResultsContext } from '../../Results';

const Modal = React.lazy(() => import('../../../components/Modal'));
const SHARE_MODAL_HEIGHT = 800;
const SHARE_MODAL_WIDTH = 600;

const Share: React.FunctionComponent<{}> = () => {

  const { results } = useContext(ResultsContext);

  return useMemo(() => (
    <Suspense fallback={<Loader />}>
      <Modal
        customCss={css`
          @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
            padding-left: ${pixelToRem(54)};
            padding-right: ${pixelToRem(54)};
          }
        `}
      >
        <H1
          customCss={css`
            font-size: ${pixelToRem(22)};
            color: ${({theme}) => theme.color.primary.normal};
            text-align: center;
          `}
        >Compartí con tus amigos</H1>
        <Nav
          customCss={css`
            display: flex;
            justify-content: space-between;
            margin-top: ${pixelToRem(40)};
          `}
        >
          <TwitterShareButton
            title={`${process.env.REACT_APP_SHARE_TWITTER_TITLE}`}
            url={`${process.env.REACT_APP_SHARE_URL}`}
            windowHeight={SHARE_MODAL_HEIGHT}
            windowWidth={SHARE_MODAL_WIDTH}
          >
            <img src={TwitterLogo} alt='Twitter' width='auto' height='auto' />
          </TwitterShareButton>

          <WhatsappShareButton
            title={`${process.env.REACT_APP_SHARE_WHATSAPP_TITLE}`}
            url={`${process.env.REACT_APP_SHARE_URL}`}
            separator=" "
            windowHeight={SHARE_MODAL_HEIGHT}
            windowWidth={SHARE_MODAL_WIDTH}
          >
            <img src={WhatsappLogo} alt='Whatsapp' width='auto' height='auto' />
          </WhatsappShareButton>
        
          <FacebookShareButton
            quote={`${process.env.REACT_APP_SHARE_FACEBOOK_TITLE}`}
            url={`${process.env.REACT_APP_SHARE_URL}`}
            windowHeight={SHARE_MODAL_HEIGHT}
            windowWidth={SHARE_MODAL_WIDTH}
          >
            <img src={FacebookLogo} alt='Facebook' width='auto' height='auto' />
          </FacebookShareButton>

          <EmailShareButton
            url={`${process.env.REACT_APP_SHARE_URL}`}
            subject={`${process.env.REACT_APP_SHARE_EMAIL_SUBJECT}`}
            body={`${process.env.REACT_APP_SHARE_EMAIL_BODY}`}
            separator=" "
            windowHeight={SHARE_MODAL_HEIGHT}
            windowWidth={SHARE_MODAL_WIDTH}
          >
            <img src={EmailLogo} alt='Email' width='auto' height='auto' />
          </EmailShareButton>
        </Nav>
      </Modal>
    </Suspense>
  ), [
    results,
  ]);
}

export default memo(withRouter(Share));