import { handleResponse } from "../utils/index.js";
import pool from "../config/db.js";
import redis from "../config/redis.js";

export const getFilterData = async (req, res, next) => {
  const CACHE_KEY = "filters_data";
  try {
    const cached = await redis.get(CACHE_KEY);

    if (cached) {
      console.log("⚡ Serving from Cache");
      return handleResponse(
        res,
        200,
        "Data fetched from cache",
        JSON.parse(cached),
      );
    }

    console.log("🐢 Fetching from Neon (DB)");
    const [categoriesResult, pricesResult] = await Promise.all([
      pool.query("SELECT id, name, slug FROM categories"),
      pool.query(
        "SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM products",
      ),
    ]);

    const dataToCache = {
      categories: categoriesResult.rows,
      prices: pricesResult.rows[0],
    };
    await redis.set(CACHE_KEY, JSON.stringify(dataToCache), "EX", 3600);

    return handleResponse(res, 200, "Data fetched successfully", {
      categories: categoriesResult.rows,
      prices: pricesResult.rows[0],
    });
  } catch (err) {
    next(err);
  }
};
