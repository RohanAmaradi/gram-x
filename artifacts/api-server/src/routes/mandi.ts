import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, mandiPricesTable } from "@workspace/db";
import {
  GetMandiPricesResponse,
  GetMandiPriceResponse,
  GetMandiPriceParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/mandi-prices", async (_req, res): Promise<void> => {
  const prices = await db
    .select()
    .from(mandiPricesTable)
    .orderBy(mandiPricesTable.cropName);
  res.json(GetMandiPricesResponse.parse(prices.map(p => ({
    ...p,
    currentPrice: Number(p.currentPrice),
    yesterdayPrice: Number(p.yesterdayPrice),
    updatedAt: p.updatedAt.toISOString(),
  }))));
});

router.get("/mandi-prices/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetMandiPriceParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [price] = await db
    .select()
    .from(mandiPricesTable)
    .where(eq(mandiPricesTable.id, params.data.id));
  if (!price) {
    res.status(404).json({ error: "Mandi price not found" });
    return;
  }
  res.json(GetMandiPriceResponse.parse({
    ...price,
    currentPrice: Number(price.currentPrice),
    yesterdayPrice: Number(price.yesterdayPrice),
    updatedAt: price.updatedAt.toISOString(),
  }));
});

export default router;
