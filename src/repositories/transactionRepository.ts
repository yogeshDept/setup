import { randomUUID } from "crypto";
import { transactions } from "../store/inMemoryStore";
import { Transaction } from "../types/models";

export async function createTransaction(
  data: Omit<Transaction, "id" | "createdAt">
): Promise<void> {
  transactions.push({
    id: randomUUID(),
    createdAt: new Date(),
    ...data,
  });
}

export async function findTransactionsByDateRange(
  userId: string,
  start: Date,
  end: Date
): Promise<Transaction[]> {
  return transactions.filter(
    (t) =>
      (t.fromUser === userId || t.toUser === userId) &&
      t.createdAt >= start &&
      t.createdAt <= end
  );
}

export async function findTransactionsByAdmin(
  adminId: string
): Promise<Transaction[]> {
  return transactions.filter(
    (t) => t.fromUser === adminId || t.toUser === adminId
  );
}
