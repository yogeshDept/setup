export enum Role {
  ADMIN = "ADMIN",
  SUB_ADMIN = "SUB_ADMIN",
}

export enum TransactionType {
  CREDIT = "CREDIT", // Admin -> SubAdmin
  DEBIT = "DEBIT", // SubAdmin uses balance
  REVERSE = "REVERSE", // Admin takes back
}
