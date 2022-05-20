import { PetSearchInput, PetType } from '../../types';

export default function searchPets(
  pets: PetType[],
  query: PetSearchInput
): PetType[] {
  const { id, name, type } = query;

  return pets.filter(
    (pet) =>
      (id && pet.id?.toString() === id) ||
      (name && pet.name.toLowerCase().includes(name?.toLowerCase())) ||
      (type && pet.type?.toLowerCase() === type)
  );
}
