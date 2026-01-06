import express from "express";
import session from "express-session";
import authRoutes from "./server/auth";
import moodRoutes from "./server/routes";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/api", moodRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
