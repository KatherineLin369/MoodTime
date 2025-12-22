import { moodEntries, type MoodEntry, type InsertMoodEntry } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createMoodEntry(entry: InsertMoodEntry): Promise<MoodEntry>;
  getMoodEntries(userId: string): Promise<MoodEntry[]>;
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
}

export const storage = new DatabaseStorage();
