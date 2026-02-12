import { countCustomersByDateRange } from "../repositories/customerRepository";
import {
  findTransactionsByAdmin,
  findTransactionsByDateRange,
} from "../repositories/transactionRepository";
import { TransactionType } from "../types/enums";
import { AdminAnalytics, SubAdminAnalytics } from "../types/analytics";

export async function getSubAdminAnalytics(
  subAdminId: string,
  start: Date,
  end: Date
): Promise<SubAdminAnalytics> {
  const tx = await findTransactionsByDateRange(subAdminId, start, end);

  const customers = await countCustomersByDateRange(
    subAdminId,
    start,
    end
  );

  const balanceUsed = tx
    .filter((t) => t.type === TransactionType.DEBIT)
    .reduce((sum, t) => sum + t.amount, 0);

  const balanceShared = tx
    .filter((t) => t.type === TransactionType.CREDIT)
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    customersAdded: customers,
    balanceUsed,
    balanceShared,
  };
}

export async function getAdminAnalytics(
  adminId: string
): Promise<AdminAnalytics> {
  const tx = await findTransactionsByAdmin(adminId);

  const totalShared = tx
    .filter(
      (t) => t.type === TransactionType.CREDIT && t.fromUser === adminId
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTakenBack = tx
    .filter(
      (t) => t.type === TransactionType.REVERSE && t.toUser === adminId
    )
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalShared,
    totalTakenBack,
  };
}
