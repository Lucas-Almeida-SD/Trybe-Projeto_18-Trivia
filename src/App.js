import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Configuracao from './pages/Configuracao';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/jogo" render={ (props) => <Jogo { ...props } /> } />
        <Route path="/configuracao" component={ Configuracao } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
