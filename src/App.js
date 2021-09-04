import React from 'react';
import { Route, Switch } from 'react-router';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Feedback } />
      <Route path="/game" component={ Game } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
