import React, { Suspense, memo, useContext, useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { AppContext } from '../App/context';
import { Loader } from '../Shared';

const Component = React.lazy(() => import('.'));
const ShareModal = React.lazy(() => import('../Modal/ShareModal'));
const AnimalDescriptionModal = React.lazy(() => import('../Modal/AnimalDescriptionModal'));

const Router: React.FunctionComponent<{}> =  memo(withRouter(() => {
  const { path } = useRouteMatch();
  const { user } = useContext(AppContext);

  return useMemo(() => (
    <Switch>
      {(user) ? (
        <>
          <Route path={path}>
            <Suspense fallback={<Loader />}>
              <Component />
            </Suspense>
          </Route>
          <Route path={`${path}/animal/:id`}>
            <Suspense fallback={<Loader />}>
              <AnimalDescriptionModal />
            </Suspense>
          </Route>
          <Route path={`${path}/share`}>
            <Suspense fallback={<Loader />}>
              <ShareModal />
            </Suspense>
          </Route>
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

Router.displayName = 'ResultsRouter';
export default Router;
