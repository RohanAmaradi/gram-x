import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const mandiPricesTable = pgTable("mandi_prices", {
  id: serial("id").primaryKey(),
  cropName: text("crop_name").notNull(),
  currentPrice: numeric("current_price", { precision: 10, scale: 2 }).notNull(),
  yesterdayPrice: numeric("yesterday_price", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull().default("kg"),
  mandiName: text("mandi_name").notNull(),
  state: text("state").notNull(),
  trend: text("trend").notNull().default("stable"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMandiPriceSchema = createInsertSchema(mandiPricesTable).omit({ id: true });
export type InsertMandiPrice = z.infer<typeof insertMandiPriceSchema>;
export type MandiPrice = typeof mandiPricesTable.$inferSelect;
