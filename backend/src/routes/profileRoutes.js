import express from "express";
import { updateProfile } from "../controllers/profileController.js";
import { uploadAvatar } from "../middlewares/avatarUpload.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.put(
  "/profile",
  authMiddleware,
  uploadAvatar.single("image"),
  updateProfile,
);

export default router;
