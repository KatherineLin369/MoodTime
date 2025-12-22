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
  app.get(api.moods.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const moods = await storage.getMoodEntries(userId);
    res.json(moods);
  });

  app.post(api.moods.create.path, isAuthenticated, async (req: any, res) => {
    try {
      const input = api.moods.create.input.parse(req.body);
      // Force userId from auth
      const mood = await storage.createMoodEntry({
        ...input,
        userId: req.user.claims.sub
      });
      res.status(201).json(mood);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
