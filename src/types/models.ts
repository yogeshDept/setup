import { Role, TransactionType } from "./enums";

export interface User {
  id: string;
  name: string;
  role: Role;
  walletBalance: number;
}

export interface Transaction {
  id: string;
  fromUser?: string;
  toUser?: string;
  amount: number;
  type: TransactionType;
  createdAt: Date;
}

export interface Customer {
  id: string;
  createdBy: string;
  createdAt: Date;
}
