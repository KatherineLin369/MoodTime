export * from "./models/auth";
export * from "./models/chat";

import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const moodEntries = pgTable("mood_entries", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // References auth users.id
  mood: integer("mood").notNull(), // 1-5 scale
  emotion: text("emotion"), // e.g., "Anxious", "Happy", "Tired"
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMoodEntrySchema = createInsertSchema(moodEntries).omit({ 
  id: true, 
  createdAt: true 
});

export type InsertMoodEntry = z.infer<typeof insertMoodEntrySchema>;
export type MoodEntry = typeof moodEntries.$inferSelect;
