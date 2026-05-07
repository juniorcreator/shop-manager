import { handleResponse } from "../utils/index.js";
import pool from "../config/db.js";

export const getFilteredProducts = async (req, res, next) => {
  try {
    let sql = `
      SELECT p.* 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const { search, category, minPrice, maxPrice } = req.query;
    console.log(category, typeof category, " category");
    console.log(Array.isArray(category), " category 2");
    console.log(category, " category 3");
    const values = [];

    if (category) {
      let categorySlugs;
      if (Array.isArray(category)) {
        categorySlugs = category;
      } else if (typeof category === "string" && category.includes(",")) {
        categorySlugs = category.split(",");
      } else {
        categorySlugs = [category];
      }

      categorySlugs = categorySlugs.map((s) => s.trim()).filter(Boolean);

      if (categorySlugs.length > 0) {
        values.push(categorySlugs);
        sql += ` AND c.slug = ANY($${values.length}::text[])`;
      }
    }
    if (search) {
      values.push(`%${search}%`);
      sql += ` AND p.name ILIKE $${values.length}`;
    }
    if (minPrice) {
      values.push(Number(minPrice));
      sql += ` AND p.price >= $${values.length}`;
    }
    if (maxPrice) {
      values.push(Number(maxPrice));
      sql += ` AND p.price <= $${values.length}`;
    }

    console.log("Values for DB:", values);
    sql += ` ORDER BY p.id DESC`;
    const result = await pool.query(sql, values);
    return handleResponse(
      res,
      200,
      "Products fetched successfully",
      result.rows,
    );
  } catch (err) {
    next(err);
  }
};
