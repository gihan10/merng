import React, { createElement, useState } from 'react';
import { Comment } from 'antd';
import { UserOutlined, LikeFilled, LikeOutlined, CommentOutlined } from '@ant-design/icons';

function PostCard(props) {
    const { post: { body, username, likesCount, commentsCount, createdAt } } = props;

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
