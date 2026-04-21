import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query(
    "SELECT id, name, email, image, created_at FROM users",
  );
  return result.rows;
};
export const getUserByIdService = async (id) => {
  const result = await pool.query(
    "SELECT id, name, email, image, created_at FROM users where id=$1",
    [id],
  );
  return result.rows[0];
};
export const createUserService = async (name, email, password) => {
  console.log(name, email, password, " newUser");
  const result = await pool.query(
    "insert into users (name, email, password) VALUES ($1, $2, $3) returning *",
    [name, email, password],
  );
  return result.rows[0];
};
export const updateUserService = async (name, email, password, id) => {
  const query = `UPDATE users SET 
      name = COALESCE($1, name), 
      email = COALESCE($2, email), 
      password = COALESCE($3, password)
    WHERE id = $4 
    RETURNING *`;

  const result = await pool.query(query, [
    name || null,
    email || null,
    password || null,
    id,
  ]);
  return result.rows[0];
};
export const deleteUserService = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1  returning *",
    [id],
  );
  return result.rows[0];
};
