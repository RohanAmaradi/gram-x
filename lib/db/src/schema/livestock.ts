import { pgTable, serial, text, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const livestockTable = pgTable("livestock", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  count: integer("count").notNull().default(1),
  feedSchedule: text("feed_schedule").notNull(),
  nextVaccination: text("next_vaccination"),
  milkPerDay: numeric("milk_per_day", { precision: 6, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertLivestockSchema = createInsertSchema(livestockTable).omit({ id: true, createdAt: true });
export type InsertLivestock = z.infer<typeof insertLivestockSchema>;
export type Livestock = typeof livestockTable.$inferSelect;
