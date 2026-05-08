import express from "express";
import { getFilterData } from "../controllers/filterController.js";

const router = express.Router();

router.get("/filterdata", getFilterData);

export default router;
