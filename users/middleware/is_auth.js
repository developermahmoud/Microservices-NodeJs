import { getByToken } from "../models/token.js";

export const isAuthMiddleware = async (req, res, next) => {
  const headerToken = req.headers["token"];
  if (!headerToken) {
    res.status(401).json({ msg: "unauthorized" });
    return;
  }
  const token = await getByToken(headerToken);
  if (!token) {
    res.status(401).json({ msg: "unauthorized" });
    return;
  }
  req.user = token.userId;
  next();
};
