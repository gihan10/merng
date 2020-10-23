import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

function Register() {
    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
    }
    const [ values, setValues ] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
    })
    const [ addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log('result', result);
        },
        variables: values
    });

    const handleSubmit = (values) => {
        try {
            const { data } = addUser({
                variables: {
                    ...values,
                },
            })
        } catch (err) {
            console.log('Error', err);
        }
    }
    
    const onFinish = (values) => {
        console.log('Success');
        handleSubmit(values);
    }

    return (
        <>
            <h1>Register</h1>
            <Form
                name="register"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: 'Please input your email'},
                        {type: 'email', message: 'Please enter a valid email'}
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
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
                <Form.Item
                    label="Confirm password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {required: true, message: 'Please input your confirm password password'},
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Confirm password doesn\'t match with password');
                            }
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

// register user mutation
const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
) {
    register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ) {
        id
        email
        createdAt
        token
    }
}
`;

export default Register;
