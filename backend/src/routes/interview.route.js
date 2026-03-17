import express from "express";
import authUser from "../middlewares/auth.middleware.js";
import {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportController} from "../controllers/interview.controller.js";
import upload from "../middlewares/file.middleware.js";


const interviewRouter = express.Router();
/**
 * @route POST /api/interview
 * @description generate new interview report on the basis  of user self description, resume pdf and jon description
 * @access private
 */

interviewRouter.post("/",authUser,upload.single("resume"),generateInterviewReportController);

/**
 * @route Get /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId",authUser,getInterviewReportByIdController)

interviewRouter.get("/".authUser,getAllInterviewReportController)

export default interviewRouter;
