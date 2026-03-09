import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
const app = express();

// IMPORTANT middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// ruquire all routes here
app.use("/api/auth",authRouter)




export default app;
