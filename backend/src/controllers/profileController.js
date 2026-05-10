import { delay, handleResponse } from "../utils/index.js";
import pool from "../config/db.js";

export const updateProfile = async (req, res, next) => {
  const { name, surname, phone } = req.body;
  const image = req.file ? req.file.location : null;
  console.log(req.user.id, " req.user2222");
  const id = req.user.id;
  // await delay(1000);
  try {
    const query = `
      UPDATE users SET
        name = COALESCE($1, name),
        surname = COALESCE($2, surname),
        phone = COALESCE($3, phone),
        image = COALESCE($4, image)
      WHERE id = $5
      RETURNING id, name, surname, phone, image, created_at;
    `;
    const result = await pool.query(query, [
      name || null,
      surname || null,
      phone || null,
      image || null,
      id,
    ]);

    if (result.rowCount === 0) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User updated successfully", result.rows[0]);
  } catch (err) {
    next(err);
  }
};
export const getProfileOrders = async (req, res, next) => {};
export const getProfileComments = async (req, res, next) => {};
