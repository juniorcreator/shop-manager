import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.get("/users", authMiddleware, adminOnly, getAllUsers);
router.get("/users/:id", authMiddleware, adminOnly, getUserById);
router.post("/users", authMiddleware, adminOnly, createUser);
router.put("/users/:id", authMiddleware, adminOnly, updateUser);
router.delete("/users/:id", authMiddleware, adminOnly, deleteUser);

export default router;
