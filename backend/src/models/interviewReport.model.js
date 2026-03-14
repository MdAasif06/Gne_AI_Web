import mongoose from "mongoose";

/**
 * - job description schema :string
 * - resume text : string
 * - self declaration :string
 *
 * - matchScore:number
 * - technical question :
 *      [{
 *       question:"",
 *       intention:"",
 *       answer:""
 *      }]
 * - behavior question :
 *      [{
 *       question:"",
 *       intention:"",
 *       answer:""
 *      }]
 *
 * - skill gaps :
 *      [{
 *       skill:"",
 *       severity:{
 *       type:string,
 *       enum:["low","medium","high"]
 * }
 * }]
 *
 * - prepation plan :
 *         [{
 *        day:number,
 *        focus:string,
 *        task:[string]
 *         }]
 */
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "behaviour question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "severity is required"],
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: {
    type: String,
    required: [true, "Task is required"],
  },
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDeclation: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
  },
  { timestamps: true },
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

export default interviewReportModel;
