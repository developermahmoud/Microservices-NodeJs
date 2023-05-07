import { validationResult } from "express-validator";

export const validateMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (result.array().length > 0) {
    res.status(422).json(result.array());
    return;
  }
  next();
};
