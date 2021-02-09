import React, { memo, useCallback, useContext, useMemo } from 'react';
import { useRouteMatch, withRouter, useHistory } from 'react-router';
import { Wrapper, Nav, View, Span, Img } from '@bit/meema.ui-components.elements';
import { H1, ButtonNavLink, Overlay } from '../../components/Elements';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/context';
import { pixelToRem } from 'meema.utils';
import { OnChangeEvent } from 'greenpeace';
import { NavLink } from 'react-router-dom';
import { XCloseIcon } from '../../assets/images';

const Form = styled.form`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: ${pixelToRem(380)};
  padding: ${pixelToRem(40)} ${pixelToRem(40)};
  background-color: white;
  border-radius: ${pixelToRem(20)};
  z-index: 9999;
`;

const FormGroup = styled(Wrapper)`
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  outline: none;
  appearance: none;  
  border: ${pixelToRem(1)} solid transparent;
  padding: ${pixelToRem(8)};
  margin: 0 0 ${pixelToRem(16)} 0;
  font-size: ${pixelToRem(16)};
  border-bottom: ${pixelToRem(1)} solid ${(props) => props.theme.color.secondary.light};
  transition: all 250ms ease;

  &:focus {
    border-bottom-color: ${(props) => props.theme.color.primary.normal};
  }
`;

const XCloseButton = styled(NavLink)`
  position: absolute;
  top: ${pixelToRem(15)};
  right: ${pixelToRem(15)};
`;

const Registration: React.FunctionComponent<{}> = () => {
  const { user, dispatch } = useContext(AppContext);
  const { path } = useRouteMatch();

  const onChange = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    dispatch({
      type: 'UPDATE_USER_DATA',
      payload: { [evt.currentTarget.name]: evt.currentTarget.value }
    });
  }, [
    dispatch,
  ]);

  return useMemo(() => (
    <>
      <Overlay />
      <Wrapper
        customCss={css`
          position: fixed;
          display: fixed;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          width: 100vw;
          height: 100vh;
          top: 0;
        `}
      >
        <Form>
          <XCloseButton to='/'>
            <Img src={XCloseIcon} />
          </XCloseButton>
          <Span
            customCss={css`
              color: ${props => props.theme.color.primary.normal};
              font-family: ${props => props.theme.font.family.normal};
              font-size: ${pixelToRem(24)};
            `}
          >Completa para comenzar</Span>
          <Wrapper
            customCss={css`
              margin: ${pixelToRem(25)} 0;
              width: 100%;
            `}
          >
            <FormGroup>
              <label htmlFor="email" />
              <Input type='text' name='fullName' value={user.fullName} placeholder='Nombre y apellido' onChange={onChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email" />
              <Input type='text' name='birthday' value={user.birthday} placeholder='DD/MM/AAAA' onChange={onChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email" />
              <Input type='email' name='email' value={user.email} placeholder='Email' onChange={onChange} />
            </FormGroup>
          </Wrapper>
          <Nav>
            <ButtonNavLink
              to='/tutorial'
              disabled={false}
            >Comenzar</ButtonNavLink>
          </Nav>
        </Form>
      </Wrapper>
    </>
  ), [
    path,
    user,
    onChange,
    dispatch,
  ]);
};

export default memo(withRouter(Registration));
