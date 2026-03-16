import  {PDFParse}  from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

const generateInterviewReportController = async (req, res) => {
  const resumeContent =await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();

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
    message:"Interview report generated successfully",
    interviewReport
  })
};

export default generateInterviewReportController;
