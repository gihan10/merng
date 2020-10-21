import React, { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

function MenuBar(props) {
    const location = useLocation();
    const [current, setCurrent] = useState(() => {
        return location.pathname.replace('/', '') || '/';
    });

    const handleClick = (e) => {
        if (e.key) {
            setCurrent(e.key)
        }
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="/" icon={<MailOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<AppstoreOutlined />}>
                <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<PlusOutlined />}>
                <Link to="/register">Register</Link>
            </Menu.Item>
        </Menu>
    );
}

export default MenuBar;
