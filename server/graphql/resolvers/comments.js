const { UserInputError, AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
  Mutation: {
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      // find the post
      const post = await Post.findById(postId);
      if (!post) {
        throw new UserInputError('Cannot find the post');
      }

      // find the comment
      const commentIndex = post.comments.findIndex((c) => c.id === commentId);
      if (commentIndex === -1) {
        throw new UserInputError('Cannot find comment');
      }

      // is deleting by same user
      if (post.comments[commentIndex].username !== username) {
        throw new AuthenticationError('You are not authorized');
      }

      // perform delete
      post.comments.splice(commentIndex, 1);
      await post.save();
      return post;
    },
    createComment: async (_, { postId, body }, context) => {
      // is authorized?
      const { username } = checkAuth(context);

      // validation
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty',
          },
        });
      }

      // find the post
      const post = await Post.findById(postId);
      if (!post) {
        throw new UserInputError('Post cannot find.');
      }

      // add the comment as the latest in to comments array
      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString(),
      });

      // save
      await post.save();

      return post;
    },
  },
};
