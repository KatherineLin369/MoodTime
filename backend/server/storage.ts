import {
  moodEntries,
  gratitudeEntries,
  type MoodEntry,
  type InsertMoodEntry,
  type GratitudeEntry,
  type InsertGratitudeEntry
} from "./schema"; // <-- FIXED

import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createMoodEntry(entry: InsertMoodEntry): Promise<MoodEntry>;
  getMoodEntries(userId: string): Promise<MoodEntry[]>;
  createGratitudeEntry(entry: InsertGratitudeEntry): Promise<GratitudeEntry>;
  getGratitudeEntries(userId: string): Promise<GratitudeEntry[]>;
}

export class DatabaseStorage implements IStorage {
  async createMoodEntry(entry: InsertMoodEntry): Promise<MoodEntry> {
    const [mood] = await db
      .insert(moodEntries)
      .values(entry)
      .returning();
    return mood;
  }

  async getMoodEntries(userId: string): Promise<MoodEntry[]> {
    return await db
      .select()
      .from(moodEntries)
      .where(eq(moodEntries.userId, userId))
      .orderBy(desc(moodEntries.createdAt));
  }

  async createGratitudeEntry(entry: InsertGratitudeEntry): Promise<GratitudeEntry> {
    const [gratitude] = await db
      .insert(gratitudeEntries)
      .values(entry)
      .returning();
    return gratitude;
  }

  async getGratitudeEntries(userId: string): Promise<GratitudeEntry[]> {
    return await db
      .select()
      .from(gratitudeEntries)
      .where(eq(gratitudeEntries.userId, userId))
      .orderBy(desc(gratitudeEntries.createdAt));
  }
}

export const storage = new DatabaseStorage();
