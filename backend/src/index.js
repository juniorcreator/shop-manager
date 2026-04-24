import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const db = await pool.query("SELECT current_database()");
  res.json({
    status: 200,
    message: "server is running",
    db: db.rows[0].current_database,
  });
});
app.use("/api", userRoutes);
app.use("/api", authRoutes);

//middleware
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Listening on port http://localhost:${port}`);
});
