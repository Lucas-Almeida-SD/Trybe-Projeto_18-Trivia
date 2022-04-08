import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Configuracao from './pages/Configuracao';
import Feedback from './pages/Feedback';
import Ranking from './pages/ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/jogo" render={ (props) => <Jogo { ...props } /> } />
        <Route path="/configuracao" component={ Configuracao } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
