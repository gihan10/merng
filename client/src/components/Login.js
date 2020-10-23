import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function Login() {
    const [form] = Form.useForm();
    const history = useHistory();

    const context = useContext(AuthContext);
    
    const [ loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { login: userData }}) {
            
            context.login(userData);
            history.push('/');
        },
        onError(err) {
            err.graphQLErrors.forEach(apolloError => {
                const { code, errors } = apolloError.extensions;
                if (code === 'BAD_USER_INPUT') {
                    const fieldData = Object.keys(errors).map((key) => {
                        return {
                            name: key,
                            errors: errors[key],
                        }
                    });
                    form.setFields(fieldData);
                }
            })
        },
    });

    const handleSubmit = async (values) => {
        await loginUser({
            variables: {
                ...values,
            },
        });
    }
    
    const onFinish = (values) => {
        handleSubmit(values);
    }

    return (
        <>
            <h1>Login</h1>
            <Form
                name="login"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password'}]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

// register user mutation
const LOGIN_USER = gql`
mutation login(
    $username: String!
    $password: String!
) {
    login(
        username: $username
        password: $password
    ) {
        id
        username
        email
        token
    }
}
`;

export default Login;
