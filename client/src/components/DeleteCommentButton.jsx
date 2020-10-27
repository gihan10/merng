import React from "react";
import { Modal, Popover } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";

import { handleError } from "../utils/errors";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      commentsCount
    }
  }
`;

function DeleteCommentButton({ post, comment }) {
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onError(err) {
      handleError(err);
    },
  });

  const onClick = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this comment?",
      onOk: () => {
        deleteComment({
          variables: {
            postId: post.id,
            commentId: comment.id,
          },
        });
      },
    });
  };

  return (
    <Popover content="Delete comment">
      <span onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
        <DeleteOutlined />
      </span>
    </Popover>
  );
}

export default DeleteCommentButton;
