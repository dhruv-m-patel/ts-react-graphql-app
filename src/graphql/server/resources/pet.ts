import { gql } from 'apollo-server-express';
import { PetSearchInput, ContextType } from '../../types';
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
      _,
      filters: { search?: PetSearchInput; ownerId: number },
      { db }: ContextType
    ) {
      const { search, ownerId } = filters;

      if (search) {
        return searchPets(db.pets, search);
      }

      if (ownerId) {
        return db.pets.filter((pet) => pet.ownerId === Number(ownerId));
      }

      return db.pets;
    },

    pet(_, filters: { id: number }, { db }: ContextType) {
      const { id: petId } = filters;
      return db.pets.find((pet) => pet.id === Number(petId));
    },
  },
  Pet: {
    owner({ ownerId }: { ownerId: number }, args, { db }: ContextType) {
      return db.users.find((user) => user.id === ownerId);
    },
  },
};
