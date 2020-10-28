const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
// load configurations
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen({ port: process.env.PORT }))
  .then((res) => {
    // eslint-disable-next-line no-console
    console.log(`server is running at ${res.url}`);
  });
