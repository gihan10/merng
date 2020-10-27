import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Comment, Card, Popover } from "antd";
import { UserOutlined, CommentOutlined } from "@ant-design/icons";
import { HashLink } from "react-router-hash-link";
import { AuthContext } from "../context/Auth";
import DeletePostButton from "./DeletePostButton";
import LikeButton from "./LikeButton";

function PostCard(props) {
  const { user } = useContext(AuthContext);
  const { post } = props;
  const {
    id,
    body,
    username,
    likes,
    likesCount,
    commentsCount,
    createdAt,
  } = post;

  const comment = () => {};

  const actions = [
    <>
      <LikeButton user={user} post={{ id, likesCount, likes }} />
      <Popover content="Comment">
        <span onClick={comment} onKeyPress={comment} role="button" tabIndex="0">
          <HashLink to={`/post/${id}#comments`}>
            <CommentOutlined />{" "}
            <span className="comment-action">{commentsCount}</span>
          </HashLink>
        </span>
      </Popover>
      {user && user.username === username && <DeletePostButton post={post} />}
    </>,
  ];

  return (
    <Card>
      <Comment
        avatar={
          <UserOutlined
            style={{
              fontSize: "26px",
              borderRadius: "20px",
              padding: "10px",
              backgroundColor: "#fde3cf",
            }}
          />
        }
        actions={actions}
        author={username}
        content={
          <>
            <Link to={`/post/${id}`}>{body}</Link>
          </>
        }
        datetime={<span>{createdAt}</span>}
      />
    </Card>
  );
}

export default PostCard;
