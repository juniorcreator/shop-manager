import { cookieOptions, handleResponse } from "../utils/index.js";
import { registerUserService, loginUserService } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};

export const registerUser = async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  const image = req.file ? req.file.location : null;

  if (!name || !email || !password) {
    return handleResponse(res, 401, "Please provide all required fields");
  }

  try {
    const newUser = await registerUserService(
      name,
      surname,
      email,
      password,
      image,
    );
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return handleResponse(res, 400, "Please provide all required fields");
  }
  console.log(req.body, " req.body in loginUser api");
  try {
    const user = await loginUserService(email, password);
    const token = generateToken(user.id);
    res.cookie("token", token, cookieOptions);

    handleResponse(res, 200, "User logged successfully api", user);
  } catch (err) {
    next(err, " loginUser");
  }
};
