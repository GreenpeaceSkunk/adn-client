import React, { memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter, useHistory } from 'react-router';
import Wrapper, { Button, H1, Nav, P, View } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { backgroundImage } from '../../styles/mixins';
import { 
  BackgroundHome,
  ChitaAnimal,
  TucanAnimal,
  PenguinAnimal,
} from '../../lib/images';
// import RegistrationForm from '../Registration';
import { AppContext } from '../App/context';
import { Link, NavLink } from 'react-router-dom';
import { pixelToRem, borderRadius } from 'greenpeace-ui-themes';
import Bubble from '../../components/Home/Bubbles';
import Registration from '../Registration';

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

const Home: React.FunctionComponent<{}> = () => {
  const { searchParams } = useContext(AppContext);
  const { path } = useRouteMatch();
  const history = useHistory();
  
  return useMemo(() => (
    <View
      customCss={css`
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 100%;
      `}
    >
      <Wrapper>
        <H1
          customCss={css`
            color: white;
          `}
        >Descubrí a qué animal autóctono te pareces más</H1>
        <ButtonNavLink to='/registration'>Comenzar</ButtonNavLink>
      </Wrapper>
      <Wrapper
        customCss={css`
          position: relative;
          display: flex;
          justify-self: flex-end;
          /* background: yellowgreen; */
          flex: 0 0 50%;
          /* overflow: hidden; */
        `}
      >
        <Bubble background={ChitaAnimal} size={295} animationTime={5} initialPosX={20} initialPosY={131} initialPosZ={0} rotateX={0} translate={75} />
        <Bubble background={PenguinAnimal} size={250} animationTime={5} initialPosX={0} initialPosY={397} initialPosZ={0} rotateX={0} translate={75} />
        <Bubble background={PenguinAnimal} size={250} animationTime={5} initialPosX={0} initialPosY={397} initialPosZ={0} rotateX={0} translate={75} />
        <Bubble background={TucanAnimal} size={322} animationTime={5} initialPosX={10} initialPosY={760} initialPosZ={0} rotateX={0} translate={75} />
      </Wrapper>
      <Switch>
        <Route path='/registration'>
          <Registration />
          {/* <Suspense fallback={<Loader />}>
          </Suspense> */}
        </Route>
      </Switch>
    </View>
  ), [
    path,
    searchParams,
  ]);
};

export default memo(withRouter(Home));
