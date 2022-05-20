import { gql, makeExecutableSchema } from 'apollo-server-express';
import { GraphQLJSONObject } from 'graphql-type-json';
import merge from 'deepmerge';
import {
  resolvers as userResolvers,
  typeDefs as userTypeDefs,
} from './resources/user';
import {
  resolvers as petResolvers,
  typeDefs as petTypeDefs,
} from './resources/pet';

const baseTypeDefs = gql`
  scalar JSONObject

  type Mutation {
    _empty: String
  }

  type Query {
    _empty: String
  }

  input SearchInput {
    id: String
    username: String
    name: String
    type: String
    createdAt: String
  }
`;

const baseResolvers = {
  JSONObject: GraphQLJSONObject,
};

export default makeExecutableSchema({
  typeDefs: [baseTypeDefs, userTypeDefs, petTypeDefs],
  resolvers: merge.all([baseResolvers, userResolvers, petResolvers]) as any, // TODO: Come up with better type definitions here
});
