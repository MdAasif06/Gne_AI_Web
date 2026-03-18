import React, { useState, useRef } from "react";
import "../style/Home.scss";
import { useInterview } from "../Hooks/userInterview.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, generateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobDescription: "",
    resume: null,
    selfDescription: "",
  });

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    const resumeFile = resumeInputRef.current.files[0];
    const response = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${response.interviewReport._id}`);
  };
  if (loading) {
    return (
      <main>
        <h1>Loading your interview plan.......</h1>
      </main>
    );
  }

  


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   // Add API call here
  //   console.log("Form Data:", formData);
  //   setIsLoading(false);
  // };

  return (
    <main className="home-container">
      <div className="home-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <h1>Interview Preparation</h1>
          <p>
            Upload your resume and job description to generate a personalized
            interview report
          </p>
        </div>

        {/* Form Section */}
        <form className="form-section" onSubmit={handleGenerateReport}>
          {/* Left Side - Job Description */}
          <div className="form-column left-column">
            <div className="form-group">
              <label htmlFor="jobDescription" className="form-label">
                <span className="label-text">Job Description</span>
                <span className="label-icon">📋</span>
              </label>
              <textarea
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="textarea-input"
                required
              ></textarea>
              <p className="helper-text">
                Provide the complete job description to generate relevant
                interview questions
              </p>
            </div>
          </div>

          {/* Right Side - Resume & Self Description */}
          <div className="form-column right-column">
            {/* Resume Upload */}
            <div className="form-group">
              <label htmlFor="resume" className="form-label">
                <span className="label-text">Upload Resume</span>
                <span className="label-icon">📄</span>
              </label>
              <div className="file-input-wrapper">
                <input
                  ref={resumeInputRef}
                  type="file"
                  name="resume"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  // onChange={handleFileChange}
                  className="file-input"
                />
                <div className="file-input-label">
                  {formData.resume ? (
                    <>
                      <span className="file-icon">✓</span>
                      <span>{formData.resume.name}</span>
                    </>
                  ) : (
                    <>
                      <span className="file-icon">📁</span>
                      <span>Choose File or drag and drop</span>
                    </>
                  )}
                </div>
              </div>
              <p className="helper-text">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            {/* Self Description */}
            <div className="form-group">
              <label htmlFor="selfDescription" className="form-label">
                <span className="label-text">Self Description</span>
                <span className="label-icon">👤</span>
              </label>
              <textarea
                name="selfDescription"
                id="selfDescription"
                placeholder="Describe your experience, skills, and career goals..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                className="textarea-input"
                required
              ></textarea>
              <p className="helper-text">
                Help us understand your background and expertise
              </p>
            </div>

            {/* Submit Button */}
            <button
              // onClick={handleGenerateReport}
              type="submit"
              className={`submit-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              Generate My Interview Strategy
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Home;
