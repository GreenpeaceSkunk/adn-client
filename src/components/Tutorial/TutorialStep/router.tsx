import React, { Suspense, memo, useMemo } from 'react';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router';
import { Loader } from '../../Shared';

const StepOne = React.lazy(() => import('./TutorialStepOne'));

const Router: React.FunctionComponent<{}> =  memo(withRouter(() => {
  const { path, url } = useRouteMatch();
  
  return useMemo(() => (
    <Switch>
      <Route path={`${path}/1`}>
        <Suspense fallback={Loader}>
          <StepOne />
        </Suspense>
      </Route>
    </Switch>
  ), [
    path,
  ]);
}));

Router.displayName = 'TutorialStepRouter';
export default Router;
