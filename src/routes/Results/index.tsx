import React, { Suspense, memo } from 'react';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router';
import Results from '../../components/Results';

const Component: React.FunctionComponent<{}> =  memo(withRouter(() => {
  const {path} = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <Results />
      </Route>
    </Switch>
  );
}));

Component.displayName = 'ResultsRouter';
export default Component;
