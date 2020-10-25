import React from 'react';
import { Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';

function DeletePostButton({ post }) {
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(cache, result) {
            // modify the apollo cache to remove deleted post.
            cache.evict({
                id: cache.identify(post)
            });
        },
        onError(err) {
            console.log('err', err);
            //@todo handle server side delete error
        }
    });

    const onClick = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this post?',
            onOk: () => {
                deletePost({
                    variables: {
                        postId: post.id
                    },
                });
            }
        })
    }

    return (
        <span onClick={onClick}>
            <DeleteOutlined />
        </span>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

export default DeletePostButton;