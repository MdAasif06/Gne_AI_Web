import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})
// const interviewReportSchema = z.object({
//   matchScore: z.number(),
//   technicalQuestions: z.array(
//     z.object({
//       question: z.string(),
//       intention: z.string(),
//       answer: z.string(),
//     })
//   ),
//   behavioralQuestions: z.array(
//     z.object({
//       question: z.string(),
//       intention: z.string(),
//       answer: z.string(),
//     })
//   ),
//   skillGaps: z.array(
//     z.object({
//       skill: z.string(),
//       severity: z.enum(["low", "medium", "high"]),
//     })
//   ),
//   preparationPlan: z.array(
//     z.object({
//       day: z.number(),
//       focus: z.string(),
//       tasks: z.array(z.string()),
//     })
//   ),
//   title: z.string(),
// });

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  
  const prompt = `
Generate an interview preparation report.

Resume: ${resume}

Self Description: ${selfDescription}

Job Description: ${jobDescription}

Return ONLY JSON with this structure:

{
 "title": string,
 "matchScore": number,
 "technicalQuestions": [
   { "question": string, "intention": string, "answer": string }
 ],
 "behavioralQuestions": [
   { "question": string, "intention": string, "answer": string }
 ],
 "skillGaps": [
   { "skill": string, "severity": "low" | "medium" | "high" }
 ],
 "preparationPlan": [
   { "day": number, "focus": string, "tasks": string[] }
 ]
}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are an AI interview preparation assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  const text = response.choices[0].message.content;

  // console.log("RAW RESPONSE:", text);

  const cleaned = text.replace(/```json|```/g, "");

  return JSON.parse(cleaned);
  // const parsed = cleaned;

  // const validated = interviewReportSchema.safeParse(parsed);

  // if (!validated.success) {
  //   console.log("Schema mismatch");
  //   console.log(validated.error.format());
  //   return parsed;
  // }

  // console.log(validated.data);

  // return validated.data;
}

export default generateInterviewReport;