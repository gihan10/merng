import React from 'react';
import { Modal, Popover } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';

function DeletePostButton({ post, callback }) {
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(cache) {
            // modify the apollo cache to remove deleted post.
            cache.evict({
                id: cache.identify(post)
            });
            if (callback) {
                callback();
            }
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
            content: 'Are you sure you want to delete this post and all it\'s comments?',
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
        <Popover content="Delete post">
            <span onClick={onClick}>
                <DeleteOutlined />
            </span>
        </Popover>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

export default DeletePostButton;