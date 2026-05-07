import express from "express";
import { getFilteredProducts } from "../controllers/productsController.js";

const router = express.Router();

router.get("/products", getFilteredProducts);

export default router;
