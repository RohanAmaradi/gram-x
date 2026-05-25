import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, schemesTable } from "@workspace/db";
import {
  GetSchemesResponse,
  GetSchemeResponse,
  GetSchemeParams,
  GetSchemesQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/schemes", async (req, res): Promise<void> => {
  const queryParams = GetSchemesQueryParams.safeParse(req.query);
  const schemes = await db.select().from(schemesTable);
  const filtered = queryParams.success && queryParams.data.state
    ? schemes.filter(s => s.state === queryParams.data.state || s.state === "All States")
    : schemes;
  res.json(GetSchemesResponse.parse(filtered));
});

router.get("/schemes/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetSchemeParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [scheme] = await db
    .select()
    .from(schemesTable)
    .where(eq(schemesTable.id, params.data.id));
  if (!scheme) {
    res.status(404).json({ error: "Scheme not found" });
    return;
  }
  res.json(GetSchemeResponse.parse(scheme));
});

export default router;
