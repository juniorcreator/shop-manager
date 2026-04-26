import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to database ");
});
pool.on("connectionError", (error) => {
  console.log("Something went wrong with db connection ", error);
});

export default pool;
