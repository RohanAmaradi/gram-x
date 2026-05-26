import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, expensesTable } from "@workspace/db";
import {
  GetExpensesResponse,
  GetExpenseSummaryResponse,
  CreateExpenseBody,
  UpdateExpenseBody,
  UpdateExpenseParams,
  UpdateExpenseResponse,
  DeleteExpenseParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function toNum(v: string | null | undefined): number {
  return v ? Number(v) : 0;
}

function formatExpense(e: typeof expensesTable.$inferSelect) {
  return {
    ...e,
    amount: toNum(e.amount),
    createdAt: e.createdAt.toISOString(),
  };
}

router.get("/expenses", async (_req, res): Promise<void> => {
  const expenses = await db
    .select()
    .from(expensesTable)
    .orderBy(expensesTable.createdAt);
  res.json(GetExpensesResponse.parse(expenses.map(formatExpense)));
});

router.get("/expenses/summary", async (_req, res): Promise<void> => {
  const expenses = await db.select().from(expensesTable);
  const totalExpenses = expenses.reduce((s, e) => s + toNum(e.amount), 0);
  const totalRevenue = 0;
  const profitLoss = totalRevenue - totalExpenses;

  const byCategory: Record<string, number> = {};
  for (const e of expenses) {
    byCategory[e.category] = (byCategory[e.category] ?? 0) + toNum(e.amount);
  }

  const byCrop: Record<string, number> = {};
  for (const e of expenses) {
    if (e.cropName) {
      byCrop[e.cropName] = (byCrop[e.cropName] ?? 0) + toNum(e.amount);
    }
  }

  res.json(GetExpenseSummaryResponse.parse({
    totalExpenses,
    totalRevenue,
    profitLoss,
    byCategory: Object.entries(byCategory).map(([category, total]) => ({ category, total })),
    byCrop: Object.entries(byCrop).map(([cropName, total]) => ({ cropName, total })),
  }));
});

router.post("/expenses", async (req, res): Promise<void> => {
  const parsed = CreateExpenseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [expense] = await db
    .insert(expensesTable)
    .values({
      ...parsed.data,
      amount: String(parsed.data.amount),
    })
    .returning();
  res.status(201).json(formatExpense(expense));
});

router.put("/expenses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateExpenseParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateExpenseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [expense] = await db
    .update(expensesTable)
    .set({
      ...parsed.data,
      amount: parsed.data.amount !== undefined ? String(parsed.data.amount) : undefined,
    })
    .where(eq(expensesTable.id, params.data.id))
    .returning();
  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  res.json(UpdateExpenseResponse.parse(formatExpense(expense)));
});

router.delete("/expenses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteExpenseParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [deleted] = await db
    .delete(expensesTable)
    .where(eq(expensesTable.id, params.data.id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
