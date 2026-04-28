import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { cookieOptions } from "../utils/index.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ message: "Logged out successfully" });
});
router.get("/me", authMiddleware, async (req, res) => {
  res.json(req.user);
});

export default router;
