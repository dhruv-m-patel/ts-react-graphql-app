import { UserSearchInput, UserType } from '../../types';

export default function searchUsers(
  users: UserType[],
  query: UserSearchInput
): UserType[] {
  const { id, username } = query;
  return users.filter(
    (user) =>
      (id && user.id?.toString() === id) ||
      (username &&
        user.username.toLowerCase().includes(username?.toLowerCase()))
  );
}
