import { IUser } from "greenpeace";
import React, { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router-dom";
import useSearchParams from "../../hooks/useSearchParams";
import { reducer, initialState, ContextActionType } from './reducer';

interface IContext {
  searchParams: string;
  refParam: string;
  user: IUser | null;
  dispatch: React.Dispatch<ContextActionType>;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'AppContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps & RouteComponentProps> = ({ children }) => {
  const { search } = useLocation();
  const [ searchParams, setSearchParams ] = useState<string>('');
  const [ refParam, setRefParam ] = useState<string>(`${process.env.REACT_APP_DEFAULT_REF_PARAM}`);
  const [{user}, dispatch] = useReducer(reducer, initialState);
  const parsedSearchParams = useSearchParams(searchParams);
  
  useEffect(() => {
    if(search !== '') {
      setSearchParams(search);
    }
  }, [
    search,
  ])

  useEffect(() => {
    if(parsedSearchParams) {
      if(parsedSearchParams.get('ref')) {
        setRefParam(parsedSearchParams.get('ref') || `${process.env.REACT_APP_DEFAULT_REF_PARAM}`)
      }
    }
  }, [
    parsedSearchParams,
  ]);

  return useMemo(() => (
    <Provider value={{
      searchParams,
      refParam,
      user,
      dispatch,
    }}>
      { children }
    </Provider>
  ), [
    searchParams,
    refParam,
    user,
    children,
  ]);
};


const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as AppProvider,
  Consumer as AppConsumer,
  Context as AppContext,
}
