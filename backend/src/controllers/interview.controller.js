import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

/**
 * @description Controller to generate interview report based on used self description and resume and job description
 */

const generateInterviewReportController = async (req, res) => {
  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();

  const { selfDescription, jobDescription } = req.body;
  const interviewReportByAI = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAI,
  });
  res.status(200).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
};
/**
 * @description controller to get interview report by interviewId
 */
const getInterviewReportByIdController = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });
    if (!interviewReport) {
      return res.status(404).json({
        message: "interview report not found",
      });
    }
    res.status(200).json({
      message: "report fetched successfully",
      interviewReport,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};


/**
 * @route Get /api/interview 
 * @description get all interview reports of logged in user
 * @private
 */
const getAllInterviewReportController=async(req,res)=>{
 const interViewReports=await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
 res.status(200).json({
  message:"Interview reports fetch success",
  interViewReports
 })
}

export { getInterviewReportByIdController, generateInterviewReportController,getAllInterviewReportController };
