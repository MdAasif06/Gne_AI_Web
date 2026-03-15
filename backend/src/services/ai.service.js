import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const interviewReportSchema = z.object({
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),
  title: z.string(),
});

async function generateInterviewReport({ resume, selfDecration, jobDescription }) {
  
  const prompt = `
Generate an interview preparation report.

Resume: ${resume}

Self Description: ${selfDecration}

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

  console.log("RAW RESPONSE:", text);

  const cleaned = text.replace(/```json|```/g, "");

  const parsed = JSON.parse(cleaned);

  const validated = interviewReportSchema.safeParse(parsed);

  if (!validated.success) {
    console.log("Schema mismatch");
    console.log(validated.error.format());
    return parsed;
  }

  console.log(validated.data);

  return validated.data;
}

export default generateInterviewReport;