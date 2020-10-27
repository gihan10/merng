import React, { createElement, useEffect, useState } from 'react';
import { Modal, Popover } from 'antd';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { useMutation, gql } from '@apollo/client'

function LikeButton({user, post: { id, likes, likesCount }}) {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [toggleLike] = useMutation(LIKE_TOGGLE_MUTATION, {
        onError(err) {
            err.graphQLErrors.forEach(apolloError => {
                const { code } = apolloError.extensions;
                switch(code) {
                    case 'UNAUTHENTICATED':
                        Modal.warning({
                            title: "Login required",
                            content: "You've may be logged out. Please login again",
                        });
                        break;
                    default:
                        Modal.warning({
                            title: "Error occured",
                            content: "Please refresh the page and try again.",
                        });
                }
            });
        }
    });

    const onClick = async () => {
        await toggleLike({
            variables: {
                postId: id,
            }
        });
    }
    return (
        <Popover content="Like">
            <span onClick={onClick}>
                {createElement(liked ? LikeFilled : LikeOutlined)}
                {' '}<span className="comment-action">{likesCount}</span>
            </span>
        </Popover>
    );
}

const LIKE_TOGGLE_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likesCount
        }
    }
`;

export default LikeButton;