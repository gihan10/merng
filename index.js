const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { mongodb } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen({ port: 5000 }))
  .then((res) => {
    console.log(`server is running at ${res.url}`);
  });
