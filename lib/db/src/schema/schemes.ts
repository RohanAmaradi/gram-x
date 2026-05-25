import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const schemesTable = pgTable("schemes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  eligibility: text("eligibility").notNull(),
  benefit: text("benefit").notNull(),
  applicationLink: text("application_link"),
  deadline: text("deadline"),
  state: text("state").notNull().default("All States"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSchemeSchema = createInsertSchema(schemesTable).omit({ id: true, createdAt: true });
export type InsertScheme = z.infer<typeof insertSchemeSchema>;
export type Scheme = typeof schemesTable.$inferSelect;
