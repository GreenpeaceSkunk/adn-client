import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect, Route, Switch, useRouteMatch, withRouter, useHistory, Router } from 'react-router';
import { Wrapper, Button, Nav, P, View, Header, Img } from '@bit/meema.ui-components.elements';
import styled, { css } from 'styled-components';
import { IAnimal } from 'greenpeace';
import { NavLink } from 'react-router-dom';
import { pixelToRem } from 'meema.utils';
import { SliderIcon } from '../../assets/images';
import { H1 } from '../../components/Elements'; 
import Animal from '../../components/Animal';
import { ArrowLeftIcon } from '../../assets/images';
import config from '../../config'; 
import ThreeCircles from '@bit/meema.ui-components.loaders.three-circles';


// example route
{/* <Route path="/products/:name" component={ProductContainer} /> */}

interface MatchParams {
    stepId?: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
}

const ProgressLine = styled(Wrapper)`
  position: absolute;
  width: 100%;
  height: ${pixelToRem(4)};
  background-color: white;
  border-radius: ${pixelToRem(4)};
`;

const WrapperAnimal = styled(Wrapper)`
  position: absolute;
  display: flex;
  justify-content: center;
  width: ${pixelToRem(310)};
  height: ${pixelToRem(310)};
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  cursor: pointer;
  opacity: 0;
    
  &.fromLeft {
    animation-name: fromLeft;
    animation-duration: 750ms;
    @keyframes fromLeft {
      0% {
        left: -${pixelToRem(310)};
      }
      100% {
        left: calc(48% - ${pixelToRem(310)});
        opacity: 1;
      }
    }
  }

  &.toLeft {
    animation-name: toLeft;
    animation-duration: 500ms;
    @keyframes toLeft {
      0% {
        opacity: 1;
        left: calc(48% - ${pixelToRem(310)});
      }
      100% {
        left: -${pixelToRem(310)};
        opacity: 0;
      }
    }
  }
  
  &.fromRight {
    animation-name: fromRight;
    animation-duration: 750ms;
    @keyframes fromRight {
      0% {
        right: -${pixelToRem(310)};
      }
      100% {
        right: calc(48% - ${pixelToRem(310)});
        opacity: 1;
      }
    }
  }

  &.toRight {
    animation-name: toRight;
    animation-duration: 500ms;
    @keyframes toRight {
      0% {
        opacity: 1;
        right: calc(48% - ${pixelToRem(310)});
      }
      100% {
        right: -${pixelToRem(310)};
        opacity: 0;
      }
    }
  }
`;

/*
Paso 1: 0 vs 1 (Math.round(Math.random() * 1))
Paso 2: 2 vs 3
Paso 3: 4 vs 5 (el 5 es un random entre el no seleccionado del Paso 1 vs Paso 2) 
*/

const Game: React.FunctionComponent<IProps> = ({
  match,
}) => {
  const { path, params } = useRouteMatch();
  const history = useHistory();
  const [ maxSteps, setMaxSteps ] = useState<number>(0);
  const [ currentStep, setCurrentStep ] = useState<number>(1);
  const [ isSelected, setIsSelected ] = useState<boolean>(false);
  const [ players, setPlayers ] = useState<IAnimal[]>([]);
  const [ winners, setWinners ] = useState<IAnimal[]>([]);
  const [ losers, setLosers ] = useState<IAnimal[]>([]);
  const [ matches, setMatches ] = useState<any[]>([]);

  const goPrev = useCallback(() => {
    setIsSelected(true);
    const timer = setTimeout(() => {
      const newUrl = match.path.replace(':stepId', `${currentStep - 1}`);
      history.replace(newUrl);
    }, 250);
    return () => clearTimeout(timer);
  }, [
    currentStep,
    history,
    match,
  ]);
  
  const goNext = useCallback(() => {
    setIsSelected(true);
    const timer = setTimeout(() => {
      if(currentStep >= maxSteps) {
        console.log("Do nothing")
        setCurrentStep(currentStep + 1);
      } else {
        const newUrl = match.path.replace(':stepId', `${currentStep + 1}`);
        history.replace(newUrl);
      }

    }, 250);
    return () => clearTimeout(timer);
  }, [
    currentStep,
    maxSteps,
    history,
    match,
  ]);

  const onClickHandler = useCallback((animal_label: string) => {
    setWinners([...winners, ...players.filter((a: IAnimal) => a.label === animal_label)])
    setLosers([...losers, ...matches[currentStep - 1].filter((a: IAnimal) => a.label !== animal_label)]);
    goNext();
  }, [
    currentStep,
    isSelected,
    maxSteps,
    matches,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSelected(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [
    currentStep,
    isSelected,
    path,
  ]);

  useEffect(() => {
    if(maxSteps > 0 && currentStep > maxSteps) {
      const timer = setTimeout(() => {
        history.push(`${match.url}/end`);
        const timer = setTimeout(() => {
          history.push(`/analysis`);
          return () => clearTimeout(timer);    
        }, 1000);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [
    currentStep,
    maxSteps,
    history,
  ])

  useEffect(() => {
    if(match.params.stepId) {
      const stepId = parseInt(match.params.stepId);
      if(stepId < 1) {
        history.replace(match.path.replace(':stepId', '1'));
      } else {
        setCurrentStep(stepId);
      }
    }
  }, [
    match,
    history,
  ]);

  useEffect(() => {
    const groups = config.animals.reduce((a: any, b: IAnimal, c: number) => {
      if(c === 0) {
         return {
           [`${b.group}`]: [b],
         }
      } else {
        if(a[b.group]) {
          return {
            ...a,
            [`${b.group}`]: [...a[b.group]].concat(b),
          }
        } else {
          return {
            ...a,
            [`${b.group}`]: [b],
          }
        }
      }
    }, []);
   
    setMaxSteps(Math.ceil(Object.values(groups).length / 2));

    const players = Object.values(groups).reduce((a: any[], b: any, c: number) => {
      const idx = Math.round(Math.random() * (b.length - 1));
      return [...a].concat(b[idx]);
    }, []);

    setPlayers(players);
    setMatches(players.reduce((a: any, b: IAnimal, c: number) => {
      const temp = (c === 0) ? [] : a;
       if(c % 2 === 0) {
         temp.push([b])
         return temp;
       } else {
         temp[temp.length - 1].push(b);
       }
      return a;
    }, []));
  }, []);

  // useEffect(() => {
  //   console.log("Winners", winners);
  // }, [
  //   winners,
  // ]);

  useEffect(() => {
    console.log("Losers", losers);
    if(losers.length === matches.length - 1) {
      if(!matches[currentStep ][1]) {
        console.log('Agregar random de perdedores');
        matches[currentStep].push(losers[Math.round(Math.random() * 1)]);
      }
    }
  }, [
    matches,
    losers,
  ]);

  return useMemo(() => (
    <View>
      <Wrapper>
        <Wrapper
          customCss={css`
            display: flex;
            width: 100%;
            margin-bottom: ${pixelToRem(20)};
          `}
        >
          <Wrapper
            customCss={css`
              display: flex;
              flex: 1 0 15%;
              padding-left: ${pixelToRem(40)};
              align-items: center;
              justify-content: flex-start;
              overflow: hidden;
            `}
          >
            <Switch>
              <Route exact path={match.path}>
                {(currentStep > 1) && (<Wrapper
                  onClick={goPrev}
                  customCss={css`
                    color: white;
                    font-family: ${pixelToRem(50)} !important;
                    cursor: pointer;
                  `}
                ><Img customCss={css`margin-right: ${pixelToRem(14)};`} src={ArrowLeftIcon} />Volver al paso anterior</Wrapper>)}
              </Route>
            </Switch>
          </Wrapper>
          <H1>Elegí con cuál te identificas más</H1>
          <Wrapper
            customCss={css`
              display: flex;
              flex: 1 0 15%;
            `}
          />
        </Wrapper>
        <Wrapper customCss={css`
          height: ${pixelToRem(40)};
          width: 100%;
          padding: 0 15%;
        `}>
          <Wrapper
            customCss={css`
              position: relative;
              align-items: center;
              display: flex;
              width: 100%;
              height: 100%;
            `}
          >
            <ProgressLine />
            <ProgressLine 
              customCss={css`
                width: calc(100% / ${maxSteps} * ${(currentStep >= maxSteps) ? maxSteps : currentStep}) !important;
                background-color: ${props => props.theme.color.primary.normal} !important;
                transition: all 500ms ease;
            `}
            />
            <Img
              customCss={css`
                position: absolute;
                top: 0;
                left: calc(100% / ${maxSteps} * ${(currentStep >= maxSteps) ? maxSteps : currentStep} - ${pixelToRem(40)});
                transition: all 500ms ease;
              `}
              src={SliderIcon}
            />
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Switch>
        <Route exact path={`${match.path}/end`}>
          <Wrapper
            customCss={css`
              padding: 10rem 0;
            `}
          >
            <ThreeCircles
              circleCss={css`
                background: white;
              `}
            />
          </Wrapper>
        </Route>
        <Route path={match.path}>
          <Wrapper
            customCss={css`
              position: relative;
              width: 100%;
              padding: 70px 0;
            `}>
              {
                (currentStep <= maxSteps) && (
                  <>
                    <WrapperAnimal
                      className={`${isSelected ? 'toLeft' : 'fromLeft'}`}
                    >
                      {(players.length && matches.length) && (
                        <Animal
                          {...matches[currentStep - 1][0]}
                          showChip={true}
                          chipOrientation='left'
                          onClickHandler={onClickHandler}
                        />
                      )}
                    </WrapperAnimal>

                    <WrapperAnimal
                      className={`${isSelected ? 'toRight' : 'fromRight'}`}
                    >
                      {(players.length && matches.length) && (
                        <Animal
                          {...matches[currentStep - 1][1]}
                          showChip={true}
                          chipOrientation='right'
                          onClickHandler={onClickHandler}
                        />
                      )}
                    </WrapperAnimal>
                  </>
                )
              }
          </Wrapper>
        </Route>
      </Switch>
    </View>
  ), [
    currentStep,
    maxSteps,
    isSelected,
    players,
    matches,
    history,
    path,
    winners,
    losers,
    match,
  ]);
};

export default memo(withRouter(Game));
