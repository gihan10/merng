import React, { createElement, useState, useContext } from 'react';
import { Comment } from 'antd';
import { UserOutlined, LikeFilled, LikeOutlined, CommentOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth';
import DeletePostButton from './DeletePostButton';

function PostCard(props) {
    const { user } = useContext(AuthContext);
    const { post } = props;
    const { body, username, likesCount, commentsCount, createdAt } = post;

    const [likes, setLikes] = useState(likesCount);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(1);
        setAction('like');
    }

    const comment = () => {

    }

    const actions = [
        <>
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                {' '}<span className="comment-action">{likes}</span>
            </span>
            <span onClick={comment}>
                <CommentOutlined />
                {' '}<span className="comment-action">{commentsCount}</span>
            </span>
            { user && user.username === username && (
                <DeletePostButton post={post} />
            )}
        </>
    ]

    return (
        <Comment
            avatar={<UserOutlined style={{ fontSize: '26px', borderRadius: '20px', padding: '10px', backgroundColor: '#fde3cf' }} />}
            actions={actions}
            author={username}
            content={
                <>
                    <p>{body}</p>
                </>
            }
            datetime={
                <span>{createdAt}</span>
            }
        />
    );
}

export default PostCard;
