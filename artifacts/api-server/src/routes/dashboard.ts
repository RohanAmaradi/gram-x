import { Router, type IRouter } from "express";
import { db, expensesTable, livestockTable, marketplaceTable, mandiPricesTable } from "@workspace/db";
import { GetDashboardSummaryResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const [expenses, livestock, listings, topCrop] = await Promise.all([
    db.select().from(expensesTable),
    db.select().from(livestockTable),
    db.select().from(marketplaceTable),
    db.select().from(mandiPricesTable).orderBy(desc(mandiPricesTable.currentPrice)).limit(1),
  ]);

  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const totalRevenue = 0;
  const profitLoss = totalRevenue - totalExpenses;
  const activeCrops = new Set(expenses.map(e => e.cropName).filter(Boolean)).size;

  res.json(GetDashboardSummaryResponse.parse({
    totalExpenses,
    totalRevenue,
    profitLoss,
    activeCrops,
    livestockCount: livestock.reduce((s, a) => s + a.count, 0),
    activeListings: listings.length,
    topCropByPrice: topCrop[0]?.cropName ?? "Wheat",
    weatherAlert: null,
  }));
});

export default router;
