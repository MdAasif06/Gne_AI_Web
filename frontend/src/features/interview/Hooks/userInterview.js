import {generateInterviewReport,interviewReportById,getAllInterviewReport} from "../services/interview.api"
import { useContext } from "react"
import {interviewContext} from "../interview.context"


export const useInterview=()=>{
    const context=useContext(interviewContext)

    if(!context){
        throw new Error("useInterview must be used within an interviewProvider")
    }
    const {loading,setLoading,report,setReport,reports,setReports} =context

    const generateReport = async ({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        try {
            const response=await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            setReport(response.interviewReport)
            return response;
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const getReportById=async(interviewId)=>{
        setLoading(true)
        try {
            const response=await getReportById(interviewId)
            setReport(response.interviewReport)
            return response;
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const getReports=async()=>{
        setLoading(true)
        try {
            const response=await getAllInterviewReport()
            setReports(response.interviewReport)
            return response;
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return {loading,report,reports,generateReport,getReportById,getReports}


}