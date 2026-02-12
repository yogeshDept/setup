import { Request, Response, Router } from "express";
import { giveBalance, takeBackBalance } from "../services/walletService";

export function createWalletRouter(): Router {
  const router = Router();

  router.post("/give", async (req: Request, res: Response) => {
    try {
      const { subAdminId, amount } = req.body as {
        subAdminId: string;
        amount: number;
      };

      const result = await giveBalance("1", subAdminId, amount);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });

  router.post("/take-back", async (req: Request, res: Response) => {
    try {
      const { subAdminId, amount } = req.body as {
        subAdminId: string;
        amount: number;
      };

      const result = await takeBackBalance("1", subAdminId, amount);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });

  return router;
}
