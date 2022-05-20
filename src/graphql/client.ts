import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // @ts-ignore-next-line
  cache: new InMemoryCache().restore(window.__PRELOADED_STATE__),
  uri: '/graphql',
});

export default client;
