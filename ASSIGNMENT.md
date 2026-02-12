# Assignment: Wallet Sharing & Analytics API

## Goal
Build a small backend service that lets an Admin share wallet balance with Sub-Admins, lets Sub-Admins spend balance to add customers, and exposes analytics for both Admins and Sub-Admins.

## Context
- There are two user roles: `ADMIN` and `SUB_ADMIN`.
- Admins can give balance to Sub-Admins and take back unused balance.
- Sub-Admins can spend balance to add customers.
- All operations must create a transaction record.
- Analytics should be computed from stored transactions and customers.

## Requirements

### Data Models
- User
  - `id`, `name`, `role`, `walletBalance`
- Transaction
  - `id`, `fromUser?`, `toUser?`, `amount`, `type`, `createdAt`
- Customer
  - `id`, `createdBy`, `createdAt`

### Transaction Types
- `CREDIT`: Admin -> Sub-Admin (balance shared)
- `DEBIT`: Sub-Admin spends balance
- `REVERSE`: Admin takes back balance

## Core Behaviors

### 1. Share Balance
Admin gives balance to Sub-Admin
- Increase Sub-Admin wallet
- Create `CREDIT` transaction

### 2. Take Back Balance
Admin takes back balance from Sub-Admin
- Only allowed if Admin has previously given balance
- Cannot take more than:
  - Remaining balance given by Admin
  - Current Sub-Admin wallet balance
- Create `REVERSE` transaction with actual deducted amount

### 3. Add Customer
Sub-Admin adds customer by spending balance
- Must have enough balance
- Reduce wallet
- Create `DEBIT` transaction
- Create customer record

## Analytics

### Sub-Admin Analytics (by date range)
Return:
- `customersAdded`
- `balanceUsed` (sum of DEBIT)
- `balanceShared` (sum of CREDIT received)

### Admin Analytics
Return:
- `totalShared` (sum of CREDIT from admin)
- `totalTakenBack` (sum of REVERSE to admin)

## API Endpoints
```
POST /wallet/give
POST /wallet/take-back
POST /customer
GET  /analytics/sub-admin/:id?start=YYYY-MM-DD&end=YYYY-MM-DD
GET  /analytics/admin/:id
```

## Constraints
- Use TypeScript + Node.js + Express
- Use in-memory storage (arrays or maps)
- Keep logic separated by layers (routes, services, repositories)
- Return JSON responses and proper status codes

## Evaluation Criteria
- Correctness of wallet logic and limits
- Transaction history accuracy
- Analytics computed from stored data
- Clean project structure
- Clear error handling
