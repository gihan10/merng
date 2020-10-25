import React, { useContext } from 'react';
import { Comment } from 'antd';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth';
import DeletePostButton from './DeletePostButton';
import LikeButton from './LikeButton';

function PostCard(props) {
    const { user } = useContext(AuthContext);
    const { post } = props;
    const { id, body, username, likes, likesCount, commentsCount, createdAt } = post;

    const comment = () => {

    }

    const actions = [
        <>
            <LikeButton user={user} post={{ id, likesCount, likes }} />
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
