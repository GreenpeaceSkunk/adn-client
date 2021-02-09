import React, { memo } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router';
import Game from '../../components/Game';

export default memo(withRouter(() => {
  const {path} = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${path}/dupla/:stepId`}>
          <Game />
        </Route>
        <Redirect from={path} to={`${path}/dupla/1`} />
      </Switch>
    </>
  );
}));
