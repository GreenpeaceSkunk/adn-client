import { Nav } from '@bit/meema.ui-components.elements';
import React, { FunctionComponent } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import { css } from 'styled-components';
import { 
  WhatsappLogo,
  FacebookLogo,
  TwitterLogo,
  EmailLogo,
} from '../../lib/icons';

const SHARE_MODAL_HEIGHT = 800;
const SHARE_MODAL_WIDTH = 600;

const SocialMediaNavs: FunctionComponent<{}> = () => {
  return (
    <Nav
      className='social-media'
      customCss={css`
        display: flex;
        > * {
          margin: 0 0.25rem;
        }
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
  )
}

SocialMediaNavs.displayName = 'SocialMediaNavs';
export default SocialMediaNavs;