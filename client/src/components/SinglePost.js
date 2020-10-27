import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { Card, Comment } from "antd";
import { UserOutlined, CommentOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth";
import DeletePostButton from "./DeletePostButton";
import DeleteCommentButton from "./DeleteCommentButton";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";

import { handleError } from '../utils/errors';

function SinglePost() {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { loading, data: { getPost: post } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
    onError(err) {
        handleError(err);
    },
  });

  if (loading) {
    return <>Loading...</>;
  }

  const { Meta } = Card;

  const getCommentActions = (comment) => {
    const actions = [];

    if (user && user.username === comment.username) {
        actions.push(<DeleteCommentButton post={post} comment={comment} key="delete" />);
    }
    return actions;
  };

  const actions = [];
  // is post owner logged in?
  if (user && user.username === post.username) {
    actions.push(
      <DeletePostButton
        key="setting"
        post={post}
        callback={() => {
          // redirect to home page after deletion
          history.push("/");
        }}
      />
    );
  }

  return (
    <>
      <Card actions={actions}>
        <Meta
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
        />
        <div>{post.body}</div>
        <div>
          <LikeButton user={user} post={post} /> <CommentOutlined />{" "}
          {post.commentsCount}
        </div>
        <h3 style={{ marginTop: "2rem" }}>Comments ({post.commentsCount})</h3>
        {user && <CommentForm postId={postId} />}
        {post.comments.length > 0 && (
          <>
            {post.comments.map((comment) => (
              <Comment
                key={comment.id}
                avatar={
                  <UserOutlined
                    style={{
                      fontSize: "13px",
                      borderRadius: "10px",
                      padding: "5px",
                      backgroundColor: "#fde3cf",
                    }}
                  />
                }
                actions={getCommentActions(comment)}
                author={comment.username}
                content={
                  <>
                    <p>{comment.body}</p>
                  </>
                }
                datetime={<span>{comment.createdAt}</span>}
              />
            ))}
          </>
        )}
      </Card>
    </>
  );
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      comments {
        id
        createdAt
        username
        body
      }
      commentsCount
      likes {
        id
        createdAt
        username
      }
      likesCount
    }
  }
`;

export default SinglePost;
