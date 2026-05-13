import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRouter.js";
import filtersRoutes from "./routes/filterRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import categoriesRotes from "./routes/categoriesRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const db = await pool.query("SELECT current_database()");
  res.json({
    status: 200,
    message: "server is running",
    db: db.rows[0].current_database,
  });
});
//users
app.use("/api", userRoutes);
//auth
app.use("/api", authRoutes);
//products
app.use("/api", productsRoutes);
//products
app.use("/api", categoriesRotes);
//filters
app.use("/api", filtersRoutes);
//profile
app.use("/api", profileRoutes);

//error middleware
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Listening on port http://localhost:${port}`);
});
