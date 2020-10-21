const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('Post not found');
        }
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      // check authorization first
      // if user is not auhtorized exception will be thrown
      const user = checkAuth(context);

      // create the post
      const newpost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newpost.save();

      // publish NEW_POST for the subscribers
      context.pubsub.publish('NEW_POST', {
        newPost: post,
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      // check authoriation first
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        // is owner deleting the post?
        if (post.username !== user.username) {
          throw new AuthenticationError('Action not allowed');
        }

        post.deleteOne();
        return 'Post deleted';
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      // authorize
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      // is post doesn't exits
      if (!post) {
        throw new UserInputError('Cannot find the post');
      }

      if (post.likes.find((like) => like.username === username)) {
        // already liked unlike now
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });
      }
      await post.save();
      return post;
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
};
