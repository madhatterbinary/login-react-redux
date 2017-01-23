import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.react';
import HomePage from './components/pages/HomePage.react';
import LoginPage from './components/pages/LoginPage.react';
import RegisterPage from './components/pages/RegisterPage.react';
import Dashboard from './components/pages/Dashboard.react';
import NotFound from './components/pages/NotFound.react';

function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();

  // check if the path isn't dashboard
  // that way we can apply specific logic
  // to display/render the path we want to
  if (nextState.location.pathname !== '/dashboard') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  }
}

export default (
  <Route component={App}>
    <Route path="/" component={HomePage} />
    <Route onEnter={checkAuth}>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/dashboard" component={Dashboard} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);

    