import React, { Suspense, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useRouteMatch, withRouter } from 'react-router';
import Elements, { Wrapper, Nav, P, Span, Label, Option } from '@bit/meema.ui-components.elements';
import { Button } from '../Elements';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/context';
import { pixelToRem } from 'meema.utils';
import { CustomCSSType, OnChangeEvent } from 'greenpeace';
import { save } from './service';
import { addZero } from '../../utils/shared';
import moment from 'moment';
import { Loader } from '../Shared';

const Modal = React.lazy(() => import('../Modal'));

const Form = styled.form`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${pixelToRem(20)};
  width: 100%;

  @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
    width: ${pixelToRem(380)};
  }
`;

const FormGroup = styled(Wrapper)`
  display: flex;
  flex-direction: row;
`;

const Input = styled(Elements.Input)<{ customCss?: CustomCSSType }>`
  width: 100%;
  height: 2.5rem;
  outline: none;
  appearance: none;  
  border: ${pixelToRem(1)} solid transparent;
  padding: ${pixelToRem(8)};
  margin: 0 0 ${pixelToRem(16)} 0;
  font-size: ${pixelToRem(16)};
  background-color: white;
  border-bottom: ${pixelToRem(1)} solid ${(props) => props.theme.color.secondary.light};
  transition: all 250ms ease;

  &:focus {
    border-bottom-color: ${(props) => props.theme.color.primary.normal};
  }

  ${(props) => props.customCss && css`
    ${props.customCss};
  `};
`;

const Select = styled.select`
  width: 100%;
  height: 2.5rem;
  outline: none;
  appearance: none;
  background-color: transparent;  
  border: ${pixelToRem(1)} solid transparent;
  padding: ${pixelToRem(8)};
  margin: 0 0 ${pixelToRem(16)} 0;
  font-size: ${pixelToRem(16)};
  border-bottom: ${pixelToRem(1)} solid ${(props) => props.theme.color.secondary.light};
  transition: all 250ms ease;
  text-align: center;

  &:focus {
    border-bottom-color: ${(props) => props.theme.color.primary.normal};
  }
`;

const Registration: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const { user, dispatch } = useContext(AppContext);
  const { path } = useRouteMatch();
  const [ errorTxt, setErrorTxt ] = useState<string>('');
  const [ now, setNow ] = useState<Date>(new Date());
  const [ birthDay, setBirthDay ] = useState<string>('');
  const [ birthMonth, setBirthMonth ] = useState<string>('');
  const [ birthYear, setBirthYear ] = useState<string>('');
  
  const onChange = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    console.log(evt.currentTarget.name);
    dispatch({
      type: 'UPDATE_USER_DATA',
      payload: { [evt.currentTarget.name]: evt.currentTarget.value }
    });

  }, [
    dispatch,
  ]);

  const onChangeBirthDate = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    const name = evt.currentTarget.name;
    switch(name) {
      case 'birthDay': {
        setBirthDay(evt.currentTarget.value);
      }
      break;
      case 'birthMonth': {
        setBirthMonth(evt.currentTarget.value);
      }
      break;
      case 'birthYear': {
        setBirthYear(evt.currentTarget.value);
      }
      break;
    }
  }, [
    dispatch,
  ]);

  useEffect(() => {
    if(birthDay !== '' && birthMonth !== '' && birthYear !== '') {
      console.log();
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: { 
          'birthDate': `${birthDay}/${birthMonth}/${birthYear}`
        },
      });
    }
  }, [
    birthDay,
    birthMonth,
    birthYear,
    dispatch,
  ])

  const onSubmit = useCallback((evt: any) => {
    evt.preventDefault();
    (async () => {
      setErrorTxt('');
      const birthDate = moment(user?.birthDate, 'DD/MM/YYYY', true);
      if((user?.fullName || '').length <= 2) {
        setErrorTxt('Ingresa tu nombre y apellido');
      } else if(!birthDate.isValid()) {
        setErrorTxt('Fecha de nacimiento inválida');
      } else if (moment.duration(moment().diff(birthDate)).years() < 18) {
        setErrorTxt('Debes ser mayor de edad');
      } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user?.email || ''))) {
        setErrorTxt('Email inválido');
      } else {  
        const result = await save({
          fullName: user?.fullName || '',
          birthDate: user?.birthDate || '',
          email: user?.email || '',
          userAgent: window.navigator.userAgent,
        });
        if(result.error) {
          setErrorTxt('Error al guardar la información');
        } else {
          history.push('/tutorial');
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
    <Suspense fallback={<Loader />}>
      <Modal>
        <Form onSubmit={onSubmit}>
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
              <label htmlFor="fullName" />
              <Input 
                type='text'
                name='fullName'
                value={user?.fullName || ''} 
                placeholder='Nombre y apellido'
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="birthDate" />
              <Input
                type='text'
                name='birthDate'
                value={user?.birthDate || ''}
                placeholder='DD/MM/AAAA'
                onChange={onChange}
                customCss={css`
                
                @media (max-width: ${props => pixelToRem(props.theme.responsive.mobile.maxWidth)}) {
                  display: none;
                }
                `}
              />
              <Wrapper
                customCss={css`
                  width: 100%;
                  display: flex;
                  flex-direction: column;

                  @media (min-width: ${props => pixelToRem(props.theme.responsive.mobile.maxWidth)}) {
                    display: none;
                  }
                `}
              >
                <Label
                  customCss={css`
                    color: grey;
                    padding: ${pixelToRem(10)};
                    font-size: ${pixelToRem(17)};
                  `}
                >Fecha de nacimiento</Label>
                <Wrapper
                  customCss={css`
                    width: 100%;
                    display: flex;
                    align-items: center;
                  `}
                >
                  <Select
                    name='birthDay'
                    onChange={onChangeBirthDate}
                    value={birthDay}
                  >
                    <option></option>
                    {Array.from({length: 31}, (_, idx) => <option key={`day-${idx}`}>{addZero(`${idx + 1}`)}</option>)}
                  </Select>
                  <Span customCss={css`display: block; padding: 0 ${pixelToRem(10)}; color: grey; `}>/</Span>
                  <Select
                    name='birthMonth'
                    onChange={onChangeBirthDate}
                    value={birthMonth}
                  >
                    <option></option>
                    {Array.from({length: 12}, (_, idx) => <option key={`month-${idx}`}>{addZero(`${idx + 1}`)}</option>)}
                  </Select>
                  <Span customCss={css`display: block; padding: 0 ${pixelToRem(10)}; color: grey; `}>/</Span>
                  <Select
                    name='birthYear'
                    onChange={onChangeBirthDate}
                    value={birthYear}
                    >
                    <option></option>
                    {Array.from({length: 120}, (_, idx) => idx).reverse().map((i) => <option key={`year-${i}`}>{((now.getFullYear() + 1) - 120) + i}</option>)}
                  </Select>
                </Wrapper>
              </Wrapper>
            </FormGroup>
            <FormGroup>
              <label htmlFor="email" />
              <Input 
                type='email'
                name='email'
                value={user?.email || ''}
                placeholder='Email'
                onChange={onChange} 
              />
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
              color: ${({theme}) => theme.color.error.normal};
              margin-top: ${pixelToRem(20)};
            `}
          >{errorTxt}</P>
        </Form>
      </Modal>
    </Suspense>
  ), [
    path,
    user,
    birthDay,
    birthMonth,
    birthYear,
    errorTxt,
    onChange,
    dispatch,
  ]);
};

export default memo(withRouter(Registration));
