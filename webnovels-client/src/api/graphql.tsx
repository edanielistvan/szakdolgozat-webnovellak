import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:8000/graphql";

export const graphQLClient = new GraphQLClient(endpoint, {
  credentials: "include",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
