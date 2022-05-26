import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Main from './components/Main';

export default function Router() {
  return (
    <Main>
      <Switch>
        <Route
          exact
          path="/"
          component={loadable(() => import('./pages/HomePage'))}
        />
      </Switch>
    </Main>
  );
}
