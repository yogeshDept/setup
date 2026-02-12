import { Request, Response, Router } from "express";
import { addCustomer } from "../services/customerService";

export function createCustomerRouter(): Router {
  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { subAdminId, cost } = req.body as {
        subAdminId: string;
        cost: number;
      };

      const result = await addCustomer(subAdminId, cost);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });

  return router;
}
