import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, livestockTable } from "@workspace/db";
import {
  GetLivestockResponse,
  CreateLivestockBody,
  UpdateLivestockBody,
  UpdateLivestockParams,
  UpdateLivestockResponse,
  DeleteLivestockParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function formatAnimal(a: typeof livestockTable.$inferSelect) {
  return {
    ...a,
    milkPerDay: a.milkPerDay ? Number(a.milkPerDay) : null,
    createdAt: a.createdAt.toISOString(),
  };
}

router.get("/livestock", async (_req, res): Promise<void> => {
  const animals = await db.select().from(livestockTable).orderBy(livestockTable.name);
  res.json(GetLivestockResponse.parse(animals.map(formatAnimal)));
});

router.post("/livestock", async (req, res): Promise<void> => {
  const parsed = CreateLivestockBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [animal] = await db
    .insert(livestockTable)
    .values({
      ...parsed.data,
      milkPerDay: parsed.data.milkPerDay != null ? String(parsed.data.milkPerDay) : null,
    })
    .returning();
  res.status(201).json(formatAnimal(animal));
});

router.put("/livestock/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateLivestockParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateLivestockBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [animal] = await db
    .update(livestockTable)
    .set({
      ...parsed.data,
      milkPerDay: parsed.data.milkPerDay !== undefined
        ? (parsed.data.milkPerDay !== null ? String(parsed.data.milkPerDay) : null)
        : undefined,
    })
    .where(eq(livestockTable.id, params.data.id))
    .returning();
  if (!animal) {
    res.status(404).json({ error: "Livestock not found" });
    return;
  }
  res.json(UpdateLivestockResponse.parse(formatAnimal(animal)));
});

router.delete("/livestock/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteLivestockParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [deleted] = await db
    .delete(livestockTable)
    .where(eq(livestockTable.id, params.data.id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Livestock not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
