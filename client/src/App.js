import './App.css';
import React from 'react';
import { Route } from "react-router-dom"
import { BrowserRouter, Switch } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CreatePokemon from './components/createPokemon/createPokemon';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/" component={NavBar} />
    </Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={CreatePokemon} />
      <Route exact path="/home/:id" component={PokemonDetails} />

    </BrowserRouter>
  );
}

export default App;
