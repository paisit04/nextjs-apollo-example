import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { RestLink } from 'apollo-link-rest';
import fetch from 'isomorphic-unfetch'

global.Headers = global.Headers || require("fetch-headers")

let apolloClient = null

function create (initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined'
  const httpLink = new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    // Use fetch() polyfill on the server
    fetch: !isBrowser && fetch
  });
  const restLink = new RestLink({
    uri: 'http://localhost:3030',
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: restLink,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}