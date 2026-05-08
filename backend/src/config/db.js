import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";
import "dotenv/config";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to database ");
});
pool.on("disconnect", () => {
  console.log("Disconnected from database ");
});
pool.on("connectionError", (error) => {
  console.log("Something went wrong with db connection ", error);
});

export default pool;
