export const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
