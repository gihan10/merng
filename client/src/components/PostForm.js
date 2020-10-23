import React from 'react';
import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

function PostForm() {
    const [ form ] = Form.useForm();
    const [ createPost, { loading } ] = useMutation(CREATE_POST_MUTATION, {
        update(cache, result) {
            console.log('result', result);

            // modify the apollo cache to inject newly created post.
            // @see https://www.apollographql.com/docs/react/data/mutations/#:~:text=If%20a%20mutation%20updates%20a,the%20fields%20that%20were%20modified.
            cache.modify({
                fields: {
                    getPosts(existing = []) {
                        const newRef = cache.writeFragment({
                            data: result.data.createPost,
                            fragment: gql`
                                fragment newPost on getPosts {
                                    id
                                    body
                                    createdAt
                                    likesCount
                                    commentsCount
                                }
                            `,
                        });
                        return [newRef, ...existing];
                    }
                }
            });

            // clear the input field
            form.setFields([
                {
                    name: 'body',
                    value: '',
                }
            ]);
        },
        onError(err) {
            console.log('err', err);
        }
    });

    const onFinish = async (values) => {
        await createPost({
            variables: values
        });
    };

    return (
      <Form name="createPost" onFinish={onFinish} form={form}>
        <Form.Item
          name="body"
          rules={[{ required: true, message: "Please add your post content." }]}
        >
          <Input placeholder="What's on your mind" />
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