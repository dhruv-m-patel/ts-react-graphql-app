import { gql } from 'apollo-server-express';
import { ContextType, UserSearchInput, UserType } from '../../types';
import searchUsers from '../sdk/searchUsers';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    pets: [Pet]
  }

  extend type Query {
    users(search: SearchInput): [User]!
    user(id: ID!): User!
  }
`;

export const resolvers = {
  Mutation: {},
  Query: {
    users(
      parent: UserType,
      args: { search?: UserSearchInput },
      context: ContextType
    ) {
      const { search } = args;
      const { db } = context;

      if (search) {
        return searchUsers(db.users, search);
      }

      return db.users;
    },

    user(parent: UserType, args: { id: number }, context: ContextType) {
      const { id: userId } = args;
      const { db } = context;
      return db.users.find((user) => user.id === Number(userId));
    },
  },
  User: {
    pets(parent: UserType, args, context: ContextType) {
      const { id } = parent;
      const { db } = context;
      return db.pets.filter((pet) => pet.ownerId === id);
    },
  },
};
