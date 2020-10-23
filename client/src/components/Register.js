import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function Register() {
    const [form] = Form.useForm();
    const history = useHistory();
    const context = useContext(AuthContext);

    const [ addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register: userData }}) {
            // @todo store auth token
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
        await addUser({
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
            <h1>Register</h1>
            <Form
                name="register"
                onFinish={onFinish}
                form={form}
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
