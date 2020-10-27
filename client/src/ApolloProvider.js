import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import { onError } from 'apollo-link-error';

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

const errorLink = onError(({ networkError }) => {
  // handle network errors here
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  link: concat(errorLink, authLink, httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
