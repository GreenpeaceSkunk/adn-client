import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useRouteMatch, withRouter } from 'react-router';
import { Wrapper, Nav, P, Span, Img } from '@bit/meema.ui-components.elements';
import { H1, Button, Overlay } from '../../components/Elements';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/context';
import { pixelToRem } from 'meema.utils';
import { OnChangeEvent } from 'greenpeace';
import { NavLink } from 'react-router-dom';
import { XCloseIcon } from '../../assets/images';
import { save } from './service';
import moment from 'moment';

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
  const history = useHistory();
  const { user, dispatch } = useContext(AppContext);
  const { path } = useRouteMatch();
  const [ errorTxt, setErrorTxt ] = useState<string>('');

  const onChange = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    dispatch({
      type: 'UPDATE_USER_DATA',
      payload: { [evt.currentTarget.name]: evt.currentTarget.value }
    });

  }, [
    dispatch,
  ]);

  const onSubmit = useCallback((evt: any) => {
    evt.preventDefault();
    (async () => {
      setErrorTxt('');
      const birthday = moment(user.birthday, 'DD/MM/YYYY', true);
      if(user.fullName.length <= 2) {
        setErrorTxt('Ingresa tu nombre y apellido');
      } else if(!birthday.isValid()) {
        setErrorTxt('Fecha de nacimiento inválida');
      } else if (moment.duration(moment().diff(birthday)).years() < 18) {
        setErrorTxt('Debes ser mayor de edad');
      } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email))) {
        setErrorTxt('Email inválido');
      } else {  
        const result = await save({
          fullName: user.fullName,
          birthday: user.birthday,
          email: user.email,
          userAgent: window.navigator.userAgent,
        });
        if(result) {
          history.push('/tutorial');
        } else {
          setErrorTxt('Error al guardar la información');
        }
      }
    })(); 
  }, [
    user,
    errorTxt,
  ]);

  useEffect(() => {
    dispatch({
      type: 'RESET_USER_DATA',
    });
  }, []);

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
        <Form onSubmit={onSubmit}>
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
            <Button
              type='submit'
            >
              Comenzar
            </Button>
          </Nav>
          <P
            customCss={css`
              color: red;
              margin-top: ${pixelToRem(20)};
            `}
          >{errorTxt}</P>
        </Form>
      </Wrapper>
    </>
  ), [
    path,
    user,
    errorTxt,
    onChange,
    dispatch,
  ]);
};

export default memo(withRouter(Registration));
