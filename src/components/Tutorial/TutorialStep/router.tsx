import React, { memo, useMemo } from 'react';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router';
import StepOne from './TutorialStepOne';

const Router: React.FunctionComponent<{}> =  memo(withRouter(() => {
  const { path } = useRouteMatch();
  
  return useMemo(() => (
    <Switch>
      <Route path={`${path}/1`}>
        <StepOne />
      </Route>
    </Switch>
  ), [
    path,
  ]);
}));

Router.displayName = 'TutorialStepRouter';
export default Router;
