import express from "express";
import { register } from "../controllers/user_controller.js";
import { userRegisterRequest } from "../requests/user_request.js";
import { validateMiddleware } from "../middleware/validation_middleware.js";
const router = express.Router();

router.post("", userRegisterRequest, validateMiddleware, register);

export default router;
