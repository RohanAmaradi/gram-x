import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, marketplaceTable } from "@workspace/db";
import {
  GetMarketplaceListingsResponse,
  CreateMarketplaceListingBody,
  DeleteMarketplaceListingParams,
  GetMarketplaceListingsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function formatListing(m: typeof marketplaceTable.$inferSelect) {
  return {
    ...m,
    quantity: Number(m.quantity),
    pricePerUnit: Number(m.pricePerUnit),
    createdAt: m.createdAt.toISOString(),
  };
}

router.get("/marketplace", async (req, res): Promise<void> => {
  const queryParams = GetMarketplaceListingsQueryParams.safeParse(req.query);
  const listings = await db
    .select()
    .from(marketplaceTable)
    .orderBy(marketplaceTable.createdAt);
  const filtered = queryParams.success && queryParams.data.type
    ? listings.filter(l => l.type === queryParams.data.type)
    : listings;
  res.json(GetMarketplaceListingsResponse.parse(filtered.map(formatListing)));
});

router.post("/marketplace", async (req, res): Promise<void> => {
  const parsed = CreateMarketplaceListingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [listing] = await db
    .insert(marketplaceTable)
    .values({
      ...parsed.data,
      quantity: String(parsed.data.quantity),
      pricePerUnit: String(parsed.data.pricePerUnit),
    })
    .returning();
  res.status(201).json(formatListing(listing));
});

router.delete("/marketplace/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteMarketplaceListingParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [deleted] = await db
    .delete(marketplaceTable)
    .where(eq(marketplaceTable.id, params.data.id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Listing not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
