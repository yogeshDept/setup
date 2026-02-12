import { Role } from "../types/enums";
import { Customer, Transaction, User } from "../types/models";

export const users: User[] = [
  {
    id: "1",
    name: "Main Admin",
    role: Role.ADMIN,
    walletBalance: 0,
  },
  {
    id: "2",
    name: "Sub Admin 1",
    role: Role.SUB_ADMIN,
    walletBalance: 0,
  },
];

export const transactions: Transaction[] = [];
export const customers: Customer[] = [];
