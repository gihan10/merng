import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";

import App from "./App";

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("authToken");
  operation.setContext(({ headers }) => {
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        ...headers,
      },
    };
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
