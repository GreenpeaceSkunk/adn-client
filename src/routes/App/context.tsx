import React, { createContext, useEffect, useMemo, useState } from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router-dom";
import useSearchParams from "../../hooks/useSearchParams";
// import yaml from 'js-yaml';
// import fs from 'fs';
// import config from '../../config.yml';

interface IContext {
  searchParams: string;
  refParam: string;
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
  const parsedSearchParams = useSearchParams(searchParams);
  const [ refParam, setRefParam ] = useState<string>(`${process.env.REACT_APP_DEFAULT_REF_PARAM}`)
  
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

  useEffect(() => {
    // try {
    //   const doc = yaml.load(fs.readFileSync(config, 'utf8'));
    //   console.log(doc);
    // } catch (e) {
    //   console.log(e);
    // }
  }, []);

  return useMemo(() => (
    <Provider value={{
      searchParams,
      refParam,
    }}>
      { children }
    </Provider>
  ), [
    searchParams,
    refParam,
    children,
  ]);
};


const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as AppProvider,
  Consumer as AppConsumer,
  Context as AppContext,
}
