import "dotenv/config";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Немає токена або невірний формат" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Токен недійсний або прострочений" });

    req.user = decodedPayload;
    next();
  });
};
