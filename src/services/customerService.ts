import { createCustomer } from "../repositories/customerRepository";
import { createTransaction } from "../repositories/transactionRepository";
import { findUserById, updateUserBalance } from "../repositories/walletRepository";
import { TransactionType } from "../types/enums";

export async function addCustomer(subAdminId: string, cost: number) {
  const user = await findUserById(subAdminId);

  if (!user) throw new Error("User not found");
  if (user.walletBalance < cost) throw new Error("Insufficient balance");

  await updateUserBalance(subAdminId, -cost);

  await createTransaction({
    fromUser: subAdminId,
    amount: cost,
    type: TransactionType.DEBIT,
  });

  return createCustomer(subAdminId);
}
