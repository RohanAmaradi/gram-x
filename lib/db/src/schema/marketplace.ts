import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const marketplaceTable = pgTable("marketplace", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  cropName: text("crop_name").notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull().default("kg"),
  pricePerUnit: numeric("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  farmerName: text("farmer_name").notNull(),
  location: text("location").notNull(),
  phone: text("phone").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMarketplaceSchema = createInsertSchema(marketplaceTable).omit({ id: true, createdAt: true });
export type InsertMarketplace = z.infer<typeof insertMarketplaceSchema>;
export type Marketplace = typeof marketplaceTable.$inferSelect;
