import React, { memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter, useHistory } from 'react-router';
import Wrapper, { Button, H1, Nav, P, View } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
// import RegistrationForm from '../Registration';
import { AppContext } from '../App/context';
import { Link, NavLink } from 'react-router-dom';
import { pixelToRem } from 'greenpeace-ui-themes';

export const Form = styled.form`
  /* flex: 1 0 100%; */
  background-color: white;
  width: ${pixelToRem(325)};
  padding: ${pixelToRem(30)} ${pixelToRem(40)};
  position: absolute;
  z-index: 1;
  border-radius: ${pixelToRem(20)};
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
  border: 1px solid transparent;
  padding: 0.5rem;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.color.secondary.light};

  &:focus {
    border-color: ${(props) => props.theme.color.primary.normal};
  }
`;

// .attrs({ activeClassName })
/* &.${activeClassName} {
  color: red;
} */
const ButtonNavLink = styled(Link)`
  display: inline-flex;
  width: auto;
  font-size: ${pixelToRem(32)};
  border-radius: ${pixelToRem(30)};
  padding: ${pixelToRem(15)} ${pixelToRem(46)};
  color: white;
  background: ${(props) => props.theme.color.primary.normal};
  transition: all 250ms ease;

  &:hover {
    background: ${(props) => props.theme.color.primary.dark};
  }
`;

const Registration: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { path } = useRouteMatch();
  const history = useHistory();
  
  return useMemo(() => (
    <View
      customCss={css`
      position: fixed;
      display: flex;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      align-items: center;
      justify-content: center;
      z-index: 99999;
    `}
    >
      <Form>
        Completa para comenzar
        <FormGroup>
          <label htmlFor="email" />
          <Input type='text' name='fullName' value={''} placeholder='Nombre y apellido' onChange={() => {}} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email" />
          <Input type='text' name='birthday' value={''} placeholder='DD/MM/AAAA' onChange={() => {}} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email" />
          <Input type='email' name='email' value={''} placeholder='Email' onChange={() => {}} />
        </FormGroup>
        <Nav>
          <ButtonNavLink to='/tutorial'>Comenzar</ButtonNavLink>
        </Nav>
      </Form>
    </View>
  ), [
    path,
    searchParams,
  ]);
};

export default memo(withRouter(Registration));
