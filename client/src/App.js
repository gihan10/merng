import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "antd/dist/antd.css";
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import MenuBar from './components/MenuBar';

function App() {
  return (
    <Router>
      <MenuBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
}

export default App;
