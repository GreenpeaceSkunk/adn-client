import React, { memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter, useHistory } from 'react-router';
import Wrapper, { Button, H1, Nav, P, View } from '@bit/meema.ui-components.elements';
import Carousel from '@bit/meema.ui-components.carousel';
import styled, { css } from 'styled-components';
// import RegistrationForm from '../Registration';
import { AppContext } from '../App/context';
import { Link, NavLink } from 'react-router-dom';
import { pixelToRem } from 'greenpeace-ui-themes';
// import config from '../../config.yml';
// console.log(config);

const Animal = styled(Wrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 ${pixelToRem(230)}; 
  height: ${pixelToRem(230)};
  background: white;
  border-radius: 50%;
  margin: 0 ${pixelToRem(34)};
  
  font-size: 40px;

  
`;

const ButtonNavLink = styled(Link)`
  display: inline-flex;
  width: auto;
  font-size: ${pixelToRem(32)};
  border-radius: ${pixelToRem(30)};
  padding: ${pixelToRem(15)} ${pixelToRem(46)};
  color: white;
  transition: all 250ms ease;
  margin: 0 ${pixelToRem(15)};
  border: solid 2px white;

  &:hover {
    background: white;
    color: ${(props) => props.theme.color.primary.dark};
  }
`;

const Tutorial: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <View>
      <H1
        customCss={css`
          width: 50vw;
          padding: ${pixelToRem(40)};
          color: white;
        `}
      >A continuación te mostraremos imágenes de animales. Para cada dupla, hace click en el animal con el que más te identifiques.</H1>
      
      <Wrapper
        customCss={css`
          padding: ${pixelToRem(80)} 0;
        `}
      >
        <Carousel
          index={0}
          showControls={false}
          showIndicators={false}
          moveX={pixelToRem(230)}
          autoSlide={true}
          infinite={true}
          delay={2000}
        >
          <Animal>1</Animal>
          <Animal>2</Animal>
          <Animal>3</Animal>
          <Animal>4</Animal>
          <Animal>5</Animal>
          <Animal>6</Animal>
          <Animal>7</Animal>
        </Carousel>
      </Wrapper>
      
      <Nav
        customCss={css`
          display: flex;
          justify-content: center;
        `}
      >
        <ButtonNavLink to='/tutorial/step/1' style={{border: 'none'}}>Anterior</ButtonNavLink>
        <ButtonNavLink to='/picker/dupla/1'>Siguiente</ButtonNavLink>
        {/*  Luego de  step 2 pasar a picker*/}
      </Nav>
    </View>
  ), [
  ]);
};

export default memo(withRouter(Tutorial));
