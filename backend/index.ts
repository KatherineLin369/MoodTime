import express from "express";
import session from "express-session";
import { createServer } from "http";
import { registerRoutes } from "./server/routes";

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Register all routes
await registerRoutes(httpServer, app);

// Start server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
