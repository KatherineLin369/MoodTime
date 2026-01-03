import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { api } from "@shared/routes";
import { z } from "zod";
import { isAuthenticated } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // 1. Setup Auth (Must be first)
  await setupAuth(app);
  registerAuthRoutes(app);

  // 2. Setup Integrations
  registerChatRoutes(app);
  registerImageRoutes(app);

  // 3. Application Routes
  
  // Mood Entries - Protected
  app.get("/api/moods", isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const moods = await storage.getMoodEntries(userId);
    res.json(moods);
  });

  app.post("/api/moods", isAuthenticated, async (req: any, res) => {
    try {
      const mood = await storage.createMoodEntry({
        ...req.body,
        userId: req.user.claims.sub
      });
      res.status(201).json(mood);
    } catch (err) {
      res.status(500).json({ message: "Failed to create mood" });
    }
  });

  // Gratitude Entries - Protected
  app.get("/api/gratitude", isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const entries = await storage.getGratitudeEntries(userId);
    res.json(entries);
  });

  app.post("/api/gratitude", isAuthenticated, async (req: any, res) => {
    try {
      const entry = await storage.createGratitudeEntry({
        ...req.body,
        userId: req.user.claims.sub
      });
      res.status(201).json(entry);
    } catch (err) {
      res.status(500).json({ message: "Failed to create gratitude entry" });
    }
  });

  return httpServer;
}
