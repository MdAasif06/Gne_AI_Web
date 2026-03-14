import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_SECRET_API_KEY,
});

// async function invokeGeminiAi() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Hello gemini ! Explain what is interview ?",
//   });
//   console.log(response.text);
// }

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidates profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technial question can be asked in the interview"),
        intention: z
          .string()
          .describe(
            "The intention of inteviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question ,what points to cover ,what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical question that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question can be asked in the interview"),
        intention: z
          .string()
          .describe(
            "The intention of inteviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question ,what points to cover ,what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral question that can be asked in the interview along with their intention and how to answer them",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity level of the skill gap, indicating how critical it is for the candidate to address this gap.",
          ),
      }),
    )
    .describe(
      "An array of skill gaps identified in the candidate's profile, each with the skill name and its severity level.",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("The day number in the preparation plan."),
        focus: z.string().describe("The main focus area for that day."),
        tasks: z
          .array(z.string())
          .describe("A list of tasks to complete on that day."),
      }),
    )
    .describe(
      "A preparation plan outlining daily tasks to address skill gaps and prepare for the interview.",
    ),
});

async function generateInterviewReport({
  resume,
  selfDecration,
  jobdescribe,
}) {
  const prompt = `Generate an interview report for a candidate with the following details
    Resume :${resume} Self describe:${selfDecration} Job describe:${jobdescribe}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });
  console.log(JSON.parse(response.text));
}
export default generateInterviewReport;
