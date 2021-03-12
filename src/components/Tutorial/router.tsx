import React, { memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { AppContext } from '../App/context';

const Component = React.lazy(() => import('.'));

const Router: React.FunctionComponent<{}> = () => {
  const { path } = useRouteMatch();
  const { user } = useContext(AppContext);

  return useMemo(() => (
    <Switch>
      {(user) ? (
        <>
          <Route path={`${path}/step`}>
            <Component />
          </Route>
          <Redirect from={path} to={`${path}/step`} />
        </>
      ) : (
        <Redirect from={path} to='/registration' />
      )}
    </Switch>
  ), [
    path,
    user,
  ]);
};

Router.displayName = 'TutorialRouter';
export default memo(withRouter(Router));
