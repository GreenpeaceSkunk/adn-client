import React, { Suspense, memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { AppContext } from '../App/context';
import Widgets from '../Widgets';

const Component = React.lazy(() => import('.'));

const Router: React.FunctionComponent<{}> =  memo(withRouter(() => {
  const { path } = useRouteMatch();
  const { user } = useContext(AppContext);

  return useMemo(() => (
    <Switch>
      <Route path={path}>
        {(user) ? (
          <Suspense fallback={<Widgets.Loader />}>
            <Component />
          </Suspense>
        ) : (
          <Redirect from={path} to='/registration' />
        )}
      </Route>
    </Switch>
  ), [
    path,
    user,
  ]);
}));

Router.displayName = 'ScannerRouter';
export default Router;
