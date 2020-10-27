const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { mongodb, port } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen({ port }))
  .then((res) => {
    console.log(`server is running at ${res.url}`);
  });
