import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import { onError } from "apollo-link-error";

import App from "./App";

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("authToken");
  operation.setContext(({ headers }) => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
    },
  }));
  return forward(operation);
});

// const errorLink = onError(({ networkError }) => {
//   // handle network errors here
//   if (networkError) {
//     // eslint-disable-next-line no-console
//     console.log(`[Network error]: ${networkError}`);
//   }
// });

// eslint-disable-next-line no-console
console.log("url", process.env.REACT_APP_SERVER_URI);
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URI,
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
