import { Request, Response, Router } from "express";
import {
  getAdminAnalytics,
  getSubAdminAnalytics,
} from "../services/analyticsService";

export function createAnalyticsRouter(): Router {
  const router = Router();

  router.get("/sub-admin/:id", async (req: Request, res: Response) => {
    try {
      const { start, end } = req.query as {
        start?: string;
        end?: string;
      };

      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const result = await getSubAdminAnalytics(
        id,
        new Date(start as string),
        new Date(end as string)
      );

      res.json(result);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });

  router.get("/admin/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const result = await getAdminAnalytics(id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  });

  return router;
}
