import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors"
import interviewRouter from "./routes/interview.route.js";

const app = express();

// IMPORTANT middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
// ruquire all routes here
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)




export default app;
