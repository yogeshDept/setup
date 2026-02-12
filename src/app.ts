import express from "express";
import { createAnalyticsRouter } from "./routes/analyticsRoutes";
import { createCustomerRouter } from "./routes/customerRoutes";
import { createWalletRouter } from "./routes/walletRoutes";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/wallet", createWalletRouter());
  app.use("/customer", createCustomerRouter());
  app.use("/analytics", createAnalyticsRouter());

  return app;
}
