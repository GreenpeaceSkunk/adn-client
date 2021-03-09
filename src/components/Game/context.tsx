import { IAnimal } from "greenpeace";
import React, { createContext, useMemo, useReducer } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { reducer, initialState, ContextActionType } from './reducer';

interface IContext {
  results: IAnimal[];
  dispatch: React.Dispatch<ContextActionType>;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'GameContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps & RouteComponentProps> = ({ children }) => {
  const [{ results }, dispatch] = useReducer(reducer, initialState);  
  return useMemo(() => (
    <Provider value={{
      results,
      dispatch,
    }}>
      { children }
    </Provider>
  ), [
    children,
    results,
    dispatch,
  ]);
};

const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as GameProvider,
  Consumer as GameConsumer,
  Context as GameContext,
}
