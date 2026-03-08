import express from "express";
import authRouter from "./routes/auth.route.js";
const app = express();

// IMPORTANT middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ruquire all routes here
app.use("/api/auth",authRouter)



export default app;
