import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUserService = async (name, surname, email, password) => {
  if (!name || !email || !password) {
    throw new Error("Please provide all required fields");
  }
  console.log(name, surname, email, password, " newUser");
  const isExists = await pool.query("select email from users where email=$1", [
    email,
  ]);
  if (isExists.rows.length > 0) {
    console.log(isExists, "email already exists");
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "insert into users (name, surname, email, password) VALUES ($1, $2, $3, $4) returning *",
    [name, surname, email, hashedPassword],
  );
  const newUser = result.rows[0];
  delete newUser.password;
  return newUser;
};
export const loginUserService = async (email, password) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
