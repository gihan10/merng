import React from 'react';
import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

function PostForm() {
    const [ createPost, { loading } ] = useMutation(CREATE_POST_MUTATION, {
        update(proxy, result) {
            console.log('result', result);
        },
        onError(err) {

        }
    });

    const onFinish = async (values) => {
        await createPost({
            variables: values
        });
    };

    return (
        <Form
            name="createPost"
            onFinish={onFinish}
        >
            <Form.Item
                name="body"
                rules={[
                    { required: true, message: 'Please add your post content.' }
                ]}
            >
                <Input
                    placeholder="What's on your mind"
                />
            </Form.Item>
            <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Post
                    </Button>
                </Form.Item>
        </Form>
    );
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            likesCount
            commentsCount
        }
    }
`;

export default PostForm;