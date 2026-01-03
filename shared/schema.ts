export * from "./models/auth";
export * from "./models/chat";

import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const moodEntries = pgTable("mood_entries", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  mood: integer("mood").notNull(),
  emotion: text("emotion"),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gratitudeEntries = pgTable("gratitude_entries", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  content: text("content").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMoodEntrySchema = createInsertSchema(moodEntries).omit({ 
  id: true, 
  createdAt: true 
});

export const insertGratitudeEntrySchema = createInsertSchema(gratitudeEntries).omit({ 
  id: true, 
  createdAt: true 
});

export type InsertMoodEntry = z.infer<typeof insertMoodEntrySchema>;
export type MoodEntry = typeof moodEntries.$inferSelect;
export type InsertGratitudeEntry = z.infer<typeof insertGratitudeEntrySchema>;
export type GratitudeEntry = typeof gratitudeEntries.$inferSelect;
