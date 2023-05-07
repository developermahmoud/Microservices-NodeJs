import { check } from "express-validator";

export const userRegisterRequest = [
  check("name").notEmpty().withMessage("name is required"),
  
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Email is invalid"),
];
export const userLoginRequest = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Email is invalid"),
    check("password").notEmpty().withMessage("password is required"),
];
