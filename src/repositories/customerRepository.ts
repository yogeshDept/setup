import { randomUUID } from "crypto";
import { customers } from "../store/inMemoryStore";
import { Customer } from "../types/models";

export async function createCustomer(
  createdBy: string
): Promise<Customer> {
  const customer: Customer = {
    id: randomUUID(),
    createdBy,
    createdAt: new Date(),
  };

  customers.push(customer);
  return customer;
}

export async function countCustomersByDateRange(
  userId: string,
  start: Date,
  end: Date
): Promise<number> {
  return customers.filter(
    (c) =>
      c.createdBy === userId &&
      c.createdAt >= start &&
      c.createdAt <= end
  ).length;
}
