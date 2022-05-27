import { gql } from 'apollo-server-express';
import { PetSearchInput, ContextType, PetType } from '../../types';
import searchPets from '../sdk/searchPets';

export const typeDefs = gql`
  enum PetType {
    cat
    dog
    lizard
  }

  type Pet {
    id: ID!
    type: PetType!
    name: String!
    createdAt: String!
    ownerId: String!
    owner: User
  }

  extend type Query {
    pets(search: SearchInput, ownerId: String): [Pet]!
    pet(id: ID!): Pet!
  }
`;

export const resolvers = {
  Mutation: {},
  Query: {
    pets(
      parent: PetType,
      args: { search?: PetSearchInput; ownerId: number },
      context: ContextType
    ) {
      const { search, ownerId } = args;
      const { db } = context;

      if (search) {
        return searchPets(db.pets, search);
      }

      if (ownerId) {
        return db.pets.filter((pet) => pet.ownerId === Number(ownerId));
      }

      return db.pets;
    },

    pet(parent: PetType, args: { id: number }, context: ContextType) {
      const { id: petId } = args;
      const { db } = context;
      return db.pets.find((pet) => pet.id === Number(petId));
    },
  },
  Pet: {
    owner(parent: PetType, args, context: ContextType) {
      const { ownerId } = parent;
      const { db } = context;
      return db.users.find((user) => user.id === ownerId);
    },
  },
};
