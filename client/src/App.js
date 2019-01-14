import React, { Component } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact={true}  path="/"  component={HomePage}/>
          <Route exact={true}  path="/login"  component={Login}/>
          <Route exact={true}  path="/register"  component={Register}/>
        </Switch>
      </div>
    );
  }
}

export default App;
