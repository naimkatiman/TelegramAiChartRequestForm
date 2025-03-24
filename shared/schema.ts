import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Bot submission schema
export const botSubmissions = pgTable("bot_submissions", {
  id: serial("id").primaryKey(),
  referenceCode: text("reference_code").notNull().unique(),
  requesterName: text("requester_name").notNull(),
  requesterEmail: text("requester_email").notNull(),
  equityIndices: jsonb("equity_indices"),
  otherEquity: text("other_equity"),
  forex: jsonb("forex"),
  otherForex: text("other_forex"),
  commodities: jsonb("commodities"),
  otherCommodities: text("other_commodities"),
  customIndicators: text("custom_indicators"),
  premiumAccess: text("premium_access").notNull(),
  otherAccess: text("other_access"),
  specialInstructions: text("special_instructions"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBotSubmissionSchema = createInsertSchema(botSubmissions).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const botSubmissionFormSchema = insertBotSubmissionSchema.extend({
  requesterName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  requesterEmail: z.string().email({ message: "Please enter a valid email address" }),
}).omit({
  referenceCode: true,  // Reference code is generated server-side
});

export type InsertBotSubmission = z.infer<typeof insertBotSubmissionSchema>;
export type BotSubmissionFormValues = z.infer<typeof botSubmissionFormSchema>;
export type BotSubmission = typeof botSubmissions.$inferSelect;
