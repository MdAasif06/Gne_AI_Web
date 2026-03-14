import app from "./src/app.js";
import connecDB from "./src/config/database.js";
import dotenv from "dotenv";
// import invokeGeminiAi from "./src/services/ai.service.js";
import {resume,selfDecration,jobDescription} from "./src/services/temp.js"
import generateInterviewReport from "./src/services/ai.service.js";
dotenv.config();
connecDB();
// invokeGeminiAi()
generateInterviewReport({resume,selfDecration,jobDescription})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running port ${port}`);
});
