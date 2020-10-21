import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "antd/dist/antd.css";
import { Layout } from 'antd';

import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import MenuBar from './components/MenuBar';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Router>
          <MenuBar />
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
