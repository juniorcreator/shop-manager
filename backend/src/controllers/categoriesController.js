import { handleResponse } from "../utils/index.js";
import pool from "../config/db.js";
import redis from "../config/redis.js";

export const categoriesController = async (req, res, next) => {
  const CACHE_KEY = "categories_data";
  try {
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      console.log("⚡ Serving categories from Cache");
      return handleResponse(
        res,
        200,
        "Data fetched from cache",
        JSON.parse(cached),
      );
    }

    console.log("🐢 Fetching categories from Neon (DB)");
    const categoriesResult = await pool.query("SELECT * FROM categories");
    await redis.set(
      CACHE_KEY,
      JSON.stringify(categoriesResult.rows),
      "EX",
      3600,
    );

    return handleResponse(
      res,
      200,
      "Categories fetched successfully",
      categoriesResult.rows,
    );
  } catch (err) {
    next(err);
  }
};
