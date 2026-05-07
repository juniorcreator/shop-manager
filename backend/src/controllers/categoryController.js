import { handleResponse } from "../utils/index.js";
import pool from "../config/db.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const categoriesResult = await pool.query(
      "SELECT id, name, slug FROM categories",
    );

    const pricesResult = await pool.query(`
      SELECT 
        MIN(price) AS min_price,
        MAX(price) AS max_price
      FROM products
    `);

    return handleResponse(res, 200, "Data fetched successfully", {
      categories: categoriesResult.rows,
      prices: pricesResult.rows[0],
    });
  } catch (err) {
    next(err);
  }
};
