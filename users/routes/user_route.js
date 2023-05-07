import express from "express";
import { register, login } from "../controllers/user_controller.js";
import {
  userLoginRequest,
  userRegisterRequest,
} from "../requests/user_request.js";
import { validateMiddleware } from "../middleware/validation_middleware.js";
const router = express.Router();

router.post("/register", userRegisterRequest, validateMiddleware, register);
router.post("/login", userLoginRequest, validateMiddleware, login);

export default router;
