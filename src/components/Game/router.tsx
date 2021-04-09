import React, { memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { AppContext } from '../App/context';
import Component from './';

const Router: React.FunctionComponent<{}> =  memo(withRouter(() => {
  const { path } = useRouteMatch();
  const { user } = useContext(AppContext);
  return useMemo(() => (
    <Switch>
      {(user) ? (
        <>
          <Route path={`${path}/dupla/:stepId`}>
            <Component />
          </Route>
          <Redirect from={path} to={`${path}/dupla/1`} />
        </>
      ) : (
        <Redirect from={path} to='/registration' />
      )}
    </Switch>
  ), [
    path,
    user,
  ]);
}));

Router.displayName = 'GameRouter';
export default Router;
