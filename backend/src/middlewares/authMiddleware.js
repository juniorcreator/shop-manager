import "dotenv/config";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Не авторизовано, немає токена" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query(
      "SELECT id, name, email, surname, role FROM users WHERE id = $1",
      [decoded.id],
    );

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Не авторизовано, юзера не знайдено" });
    }
    req.user = user.rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Не аворизовано, не валідний токен" });
  }
};
