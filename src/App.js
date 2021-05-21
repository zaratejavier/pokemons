import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import PokemonView from './components/PokemonView';
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/pokemon/:id" component={PokemonView} />
      <Route component={NoMatch} />
    </Switch>
  </>
);

export default App;
