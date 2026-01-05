import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import authRoutes from "./auth";

// Clean version — now includes auth routes + real user sessions
export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  //
  // AUTH ROUTES
  //
  app.use("/api/auth", authRoutes);

  //
  // APPLICATION ROUTES (now protected)
  //

  // Mood Entries
  app.get("/api/moods", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ message: "Not logged in" });

      const moods = await storage.getMoodEntries(userId);
      res.json(moods);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch moods" });
    }
  });

  app.post("/api/moods", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ message: "Not logged in" });

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
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ message: "Not logged in" });

      const entries = await storage.getGratitudeEntries(userId);
      res.json(entries);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch gratitude entries" });
    }
  });

  app.post("/api/gratitude", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ message: "Not logged in" });

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
