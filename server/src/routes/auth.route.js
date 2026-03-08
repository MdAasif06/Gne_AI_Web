import { Router } from "express";
import registerUser from "../controllers/auth.controller.js";
const authRouter = Router();


/**
 * @route POST /api/auth/register  
 * @description Register new user
 * @access Public
 */

authRouter.post("/register",registerUser.registerUser)
authRouter.post("/login",registerUser.userLogin)


export default authRouter;
