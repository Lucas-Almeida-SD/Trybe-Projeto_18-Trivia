import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Configuracao from './pages/Configuracao';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/jogo" component={ Jogo } />
        <Route path="/configuracao" component={ Configuracao } />
      </Switch>
    </div>
  );
}
