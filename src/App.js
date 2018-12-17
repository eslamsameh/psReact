import React, { Component } from 'react';
import './App.css';
import Login from './auth/login';
import Pages from './pages/pages';
import { BrowserRouter as Router, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/pages" component={Pages} />

      </div>
    </Router>
    );
  }
}

export default App;
