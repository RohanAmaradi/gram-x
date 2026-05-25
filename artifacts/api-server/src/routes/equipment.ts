import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, equipmentTable } from "@workspace/db";
import {
  GetEquipmentResponse,
  GetEquipmentItemResponse,
  GetEquipmentItemParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/equipment", async (_req, res): Promise<void> => {
  const items = await db.select().from(equipmentTable).orderBy(equipmentTable.name);
  res.json(GetEquipmentResponse.parse(items.map(e => ({
    ...e,
    pricePerHour: Number(e.pricePerHour),
    pricePerDay: Number(e.pricePerDay),
  }))));
});

router.get("/equipment/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetEquipmentItemParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db
    .select()
    .from(equipmentTable)
    .where(eq(equipmentTable.id, params.data.id));
  if (!item) {
    res.status(404).json({ error: "Equipment not found" });
    return;
  }
  res.json(GetEquipmentItemResponse.parse({
    ...item,
    pricePerHour: Number(item.pricePerHour),
    pricePerDay: Number(item.pricePerDay),
  }));
});

export default router;
