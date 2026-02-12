import { findUserById, updateUserBalance } from "../repositories/walletRepository";
import {
  createTransaction,
  findTransactionsByAdmin,
} from "../repositories/transactionRepository";
import { Role, TransactionType } from "../types/enums";

export async function giveBalance(
  adminId: string,
  subAdminId: string,
  amount: number
) {
  const admin = await findUserById(adminId);
  const subAdmin = await findUserById(subAdminId);

  if (!admin || admin.role !== Role.ADMIN)
    throw new Error("Only admin can give balance");

  if (!subAdmin || subAdmin.role !== Role.SUB_ADMIN)
    throw new Error("Invalid sub-admin");

  await updateUserBalance(subAdminId, amount);

  await createTransaction({
    fromUser: adminId,
    toUser: subAdminId,
    amount,
    type: TransactionType.CREDIT,
  });

  return { message: "Balance shared" };
}

export async function takeBackBalance(
  adminId: string,
  subAdminId: string,
  amount: number
) {
  const subAdmin = await findUserById(subAdminId);

  if (!subAdmin) throw new Error("Sub-admin not found");

  const transactions = await findTransactionsByAdmin(adminId);

  const givenAmount = transactions
    .filter(
      (t) =>
        t.type === TransactionType.CREDIT &&
        t.fromUser === adminId &&
        t.toUser === subAdminId
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const alreadyTakenBack = transactions
    .filter(
      (t) =>
        t.type === TransactionType.REVERSE &&
        t.fromUser === subAdminId &&
        t.toUser === adminId
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingFromAdmin = givenAmount - alreadyTakenBack;

  if (remainingFromAdmin <= 0)
    throw new Error("Nothing left to take back from this sub-admin");

  const deduct = Math.min(
    amount,
    remainingFromAdmin,
    subAdmin.walletBalance
  );

  await updateUserBalance(subAdminId, -deduct);

  await createTransaction({
    fromUser: subAdminId,
    toUser: adminId,
    amount: deduct,
    type: TransactionType.REVERSE,
  });

  return { takenBack: deduct };
}
