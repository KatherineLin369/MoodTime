import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Mood entries table
export const moodEntries = pgTable("mood_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  mood: text("mood").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Gratitude entries table
export const gratitudeEntries = pgTable("gratitude_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  gratitude: text("gratitude").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Types
export type MoodEntry = typeof moodEntries.$inferSelect;
export type InsertMoodEntry = typeof moodEntries.$inferInsert;

export type GratitudeEntry = typeof gratitudeEntries.$inferSelect;
export type InsertGratitudeEntry = typeof gratitudeEntries.$inferInsert;
