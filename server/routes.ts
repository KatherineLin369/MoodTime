import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Clean version — no Replit auth, no chat/image integrations
export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Application Routes (no authentication yet)

  // Mood Entries
  app.get("/api/moods", async (req, res) => {
    try {
      // TEMP: no auth — replace with real user ID later
      const userId = "demo-user";
      const moods = await storage.getMoodEntries(userId);
      res.json(moods);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch moods" });
    }
  });

  app.post("/api/moods", async (req, res) => {
    try {
      const userId = "demo-user"; // TEMP
      const mood = await storage.createMoodEntry({
        ...req.body,
        userId,
      });
      res.status(201).json(mood);
    } catch (err) {
      res.status(500).json({ message: "Failed to create mood" });
    }
  });

  // Gratitude Entries
  app.get("/api/gratitude", async (req, res) => {
    try {
      const userId = "demo-user"; // TEMP
      const entries = await storage.getGratitudeEntries(userId);
      res.json(entries);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch gratitude entries" });
    }
  });

  app.post("/api/gratitude", async (req, res) => {
    try {
      const userId = "demo-user"; // TEMP
      const entry = await storage.createGratitudeEntry({
        ...req.body,
        userId,
      });
      res.status(201).json(entry);
    } catch (err) {
      res.status(500).json({ message: "Failed to create gratitude entry" });
    }
  });

  return httpServer;
}
