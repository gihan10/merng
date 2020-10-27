import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";

import "./App.css";

import { AuthProvider } from "./context/Auth";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SinglePost from "./components/SinglePost";

import MenuBar from "./components/MenuBar";

import AuthRoute from "./components/AuthRoute";

const { Content } = Layout;

function App() {
  return (
    <AuthProvider>
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
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/post/:postId" component={SinglePost} />
          </Content>
        </Router>
      </Layout>
    </AuthProvider>
  );
}

export default App;
