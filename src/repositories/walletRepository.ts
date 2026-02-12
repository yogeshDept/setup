import { users } from "../store/inMemoryStore";
import { User } from "../types/models";

export async function findUserById(userId: string): Promise<User | null> {
  return users.find((u) => u.id === userId) || null;
}

export async function updateUserBalance(
  userId: string,
  amount: number
): Promise<void> {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");

  user.walletBalance += amount;
}
