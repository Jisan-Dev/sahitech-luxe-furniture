import express from "express";
import { createUser, getUser, loginUser } from "../controllers/auth-controller.js";
import { protect } from "../middlewares/auth.js";
const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", protect, getUser);

export default authRouter;
