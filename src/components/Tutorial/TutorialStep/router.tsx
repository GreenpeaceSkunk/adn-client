import React, { memo, useMemo } from 'react';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router';
import StepOne from './TutorialStepOne';

const Router: React.FunctionComponent<{
  children?: React.ReactNode | HTMLAllCollection;
}> =  memo(withRouter(({
  children,
}) => {
  const { path } = useRouteMatch();
  
  return useMemo(() => (
    <Switch>
      <Route path={`${path}/1`}>
        <StepOne>{children}</StepOne>
      </Route>
    </Switch>
  ), [
    children,
    path,
  ]);
}));

Router.displayName = 'TutorialStepRouter';
export default Router;
