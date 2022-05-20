export interface UserType {
  id: number;
  username: string;
  pets: PetType[];
}

export interface PetType {
  id: number;
  type: 'cat' | 'dog' | 'lizard';
  name: string;
  createdAt: string;
  ownerId: number;
  owner: UserType;
}

export interface UserSearchInput {
  id: string;
  username: string;
}

export interface PetSearchInput {
  id: string;
  name: string;
  type: 'cat' | 'dog' | 'lizard';
}

interface Database {
  users: UserType[];
  pets: PetType[];
}

export interface ContextType {
  config: {};
  ip: string;
  db: Database;
}
