import React, { useState, useContext } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../context/Auth";

function MenuBar() {
  const location = useLocation();
  const [current, setCurrent] = useState(
    () => location.pathname.replace("/", "") || "/"
  );

  const { user, logout } = useContext(AuthContext);

  const handleClick = (e) => {
    if (e.key) {
      setCurrent(e.key);
    }
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/" icon={<MailOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {user === null && (
        <Menu.Item key="login" icon={<AppstoreOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
      {user !== null && (
        <Menu.Item key="login" icon={<AppstoreOutlined />}>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="register" icon={<PlusOutlined />}>
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuBar;
