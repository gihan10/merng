import React from "react";
import { Form, Input, Button } from "antd";
import { useMutation, gql } from "@apollo/client";

import { handleError } from "../utils/errors";

const MUTATION_CREATE_COMMENT = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentsCount
    }
  }
`;

function CommentForm({ postId }) {
  const [form] = Form.useForm();
  const [createComment, { loading }] = useMutation(MUTATION_CREATE_COMMENT, {
    update() {
      // clear input
      form.setFields([
        {
          name: "body",
          value: "",
        },
      ]);
    },
    onError(err) {
      handleError(err);
    },
  });

  const submitHandler = () => {
    createComment({
      variables: {
        postId,
        body: form.getFieldValue("body"),
      },
    });
  };

  const { TextArea } = Input;

  return (
    <Form form={form}>
      <Form.Item name="body">
        <TextArea rows={2} placeholder="Add your comment here..." />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={loading}
          onClick={submitHandler}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CommentForm;
