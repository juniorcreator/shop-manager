import { handleResponse } from "../utils/index.js";
import { registerUserService, loginUserService } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const registerUser = async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  console.log(req.body, " req.body in createUser api");
  try {
    const newUser = await registerUserService(name, surname, email, password);
    console.log(newUser, "newUser createUser");
    handleResponse(res, 201, "User created successfully api", newUser);
  } catch (err) {
    console.log(err, " createUser api 11");
    next(err);
  }
};
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body, " req.body in loginUser api");
  try {
    const user = await loginUserService(email, password);
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "10s",
      },
    );
    console.log(user, "user loginUser");
    handleResponse(res, 200, "User logged successfully api", { user, token });
  } catch (err) {
    console.log(err, " loginUser api 11");
    next(err);
  }
};
