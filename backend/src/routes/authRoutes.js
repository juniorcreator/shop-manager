import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { cookieOptions } from "../utils/index.js";
import { uploadAvatar } from "../middlewares/avatarUpload.js";

const router = express.Router();

router.post("/register", uploadAvatar.single("image"), registerUser);
router.post("/login", loginUser);
router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ message: "Logged out successfully" });
});
router.get("/me", authMiddleware, async (req, res) => {
  res.json(req.user);
});

export default router;
