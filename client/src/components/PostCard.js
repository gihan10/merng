import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from 'antd';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth';
import DeletePostButton from './DeletePostButton';
import LikeButton from './LikeButton';
import { HashLink } from 'react-router-hash-link';

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
                <HashLink to={`/post/${id}#comments`}>
                <CommentOutlined />
                {' '}<span className="comment-action">{commentsCount}</span>
                </HashLink>
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
                    <Link to={`/post/${id}`}>{body}</Link>
                </>
            }
            datetime={
                <span>{createdAt}</span>
            }
        />
    );
}

export default PostCard;
