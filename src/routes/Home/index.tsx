import React, { memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter, useHistory } from 'react-router';
import { Wrapper, Button, Nav, P, View } from '@bit/meema.ui-components.elements';
import { H1, ButtonNavLink } from '../../components/Elements';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/context';
import { pixelToRem } from 'meema.utils';
import Registration from '../Registration';
import Animal from '../../components/Animal';
import Bubble from '../../components/Home/Bubble';
import config from '../../config'; 

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
      <Wrapper
        customCss={css`
          padding: ${pixelToRem(40)};
        `}
      >
        <H1
          fontSize={pixelToRem(58)
        }>Descubrí a qué <br/>animal autóctono te pareces más</H1>
        <ButtonNavLink to='/registration' style={{marginTop: pixelToRem(30)}}>Comenzar</ButtonNavLink>
      </Wrapper>
      <Wrapper
        customCss={css`
          position: relative;
          display: flex;
          justify-self: flex-end;
          flex: 0 0 50%;
        `}
      >
        <Bubble size={380} animationTime={5} initialPosX={60} initialPosY={-260}><Animal {...config.animals[2]}/></Bubble>
        <Bubble size={155} animationTime={5} initialPosX={30} initialPosY={-100}><Animal {...config.animals[7]}/></Bubble>
        <Bubble size={295} animationTime={5} initialPosX={-10} initialPosY={0}><Animal {...config.animals[0]}/></Bubble>
        <Bubble size={300} animationTime={5} initialPosX={60} initialPosY={380}><Animal {...config.animals[1]}/></Bubble>
        <Bubble size={150} animationTime={5} initialPosX={40} initialPosY={100}><Animal {...config.animals[4]}/></Bubble>
        <Bubble size={200} animationTime={5} initialPosX={65} initialPosY={150}><Animal {...config.animals[5]}/></Bubble>
        <Bubble size={170} animationTime={5} initialPosX={40} initialPosY={280}><Animal {...config.animals[6]}/></Bubble>
        <Bubble size={250} animationTime={5} initialPosX={-30} initialPosY={340}><Animal {...config.animals[3]}/></Bubble>
        <Bubble size={150} animationTime={5} initialPosX={10} initialPosY={320}><Animal {...config.animals[8]}/></Bubble>
        <Bubble size={322} animationTime={5} initialPosX={10} initialPosY={490}><Animal {...config.animals[9]}/></Bubble>
      </Wrapper>
      <Switch>
        <Route path='/registration'>
          <Registration />
        </Route>
      </Switch>
    </View>
  ), [
    path,
    searchParams,
  ]);
};

export default memo(withRouter(Home));
