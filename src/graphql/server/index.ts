import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import context from './context';

export default new ApolloServer({
  context,
  schema,
});
