import { gql } from 'apollo-server-express';
import { ContextType, UserSearchInput } from '../../types';
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
    users(_, { search }: { search?: UserSearchInput }, { db }: ContextType) {
      if (search) {
        return searchUsers(db.users, search);
      }

      return db.users;
    },

    user(_, { id: userId }: { id: number }, { db }: ContextType) {
      return db.users.find((user) => user.id === Number(userId));
    },
  },
  User: {
    pets({ id }: { id: number }, args, { db }: ContextType) {
      return db.pets.filter((pet) => pet.ownerId === id);
    },
  },
};
