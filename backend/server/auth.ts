import { Router } from "express";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// SIGN UP
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const password_hash = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("users")
    .insert({ email, password_hash });

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: "Account created" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user)
    return res.status(400).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match)
    return res.status(400).json({ message: "Invalid email or password" });

  // Save session
  req.session.userId = user.id;

  res.json({ message: "Logged in", userId: user.id });
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

export default router;
