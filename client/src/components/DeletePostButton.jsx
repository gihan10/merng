import React from "react";
import { Modal, Popover } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { handleError } from "../utils/errors";

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

function DeletePostButton({ post, callback }) {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(cache) {
      // modify the apollo cache to remove deleted post.
      cache.evict({
        id: cache.identify(post),
      });
      if (callback) {
        callback();
      }
    },
    onError(err) {
      handleError(err);
    },
  });

  const onClick = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content:
        "Are you sure you want to delete this post and all it's comments?",
      onOk: () => {
        deletePost({
          variables: {
            postId: post.id,
          },
        });
      },
    });
  };

  return (
    <Popover content="Delete post">
      <span onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
        <DeleteOutlined />
      </span>
    </Popover>
  );
}

export default DeletePostButton;
