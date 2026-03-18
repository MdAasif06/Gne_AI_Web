import React, { useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../Hooks/userInterview.js";

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");

  // Sample data - replace with actual data from props or API

 const { report } = useInterview();

const {
  // title = "",
  matchScore = 0,
  technicalQuestions = [],
  behavioralQuestions = [],
  skillGaps = [],
  preparationPlan = [],
} = report || {};
  console.log(report);
   //  Loading state
  if (!report) {
    return <p>Loading...</p>;
  }

  // const report =
  //   activeTab === "technical"
  //     ? report.technicalQuestions
  //     : report.behavioralQuestions;

  return (
    <div className="interview-container">
      {/* Left Sidebar */}
      <aside className="sidebar-left">
        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === "technical" ? "active" : ""}`}
            onClick={() => setActiveTab("technical")}
          >
            Technical questions
          </button>
          <button
            className={`nav-item ${activeTab === "behavioral" ? "active" : ""}`}
            onClick={() => setActiveTab("behavioral")}
          >
            Behavioral questions
          </button>
          <button
            className={`nav-item ${activeTab === "roadmap" ? "active" : ""}`}
            onClick={() => setActiveTab("roadmap")}
          >
            Road Map
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === "technical" && (
          <div className="questions-section">
            <h3>Technical Questions</h3>
            <div className="questions-list">
              {technicalQuestions?.map((item, index) => (
                <div key={index} className="question-card">
                  <div className="question-header">
                    <h4>{item.question}</h4>
                  </div>
                  <div className="question-body">
                    <p>
                      <strong>Intention:</strong> {item.intention}
                    </p>
                    <p>
                      <strong>Answer:</strong> {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "behavioral" && (
          <div className="questions-section">
            <h3>Behavioral Questions</h3>
            <div className="questions-list">
              {behavioralQuestions?.map((item, index) => (
                <div key={index} className="question-card">
                  <div className="question-header">
                    <h4>{item.question}</h4>
                  </div>
                  <div className="question-body">
                    <p>
                      <strong>Intention:</strong> {item.intention}
                    </p>
                    <p>
                      <strong>Answer:</strong> {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="roadmap-section">
            <h3>Preparation Road Map</h3>
            <div className="roadmap-list">
              {preparationPlan?.map((day) => (
                <div key={day.day} className="roadmap-card">
                  <div className="day-header">
                    <h4>Day {day.day}</h4>
                    <p className="focus">{day.focus}</p>
                  </div>
                  <div className="tasks">
                    {day.tasks?.map((task, idx) => (
                      <div key={idx} className="task-item">
                        ✓ {task}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar-right">
        <div className="score-section">
          <h3>Match Score</h3>
          <div className="score-display">{matchScore || 0}%</div>
        </div>

        <div className="skill-gaps-section">
          <h3>Skill Gaps</h3>
          <div className="skill-list">
            {skillGaps?.map((skill, index) => (
              <button key={index} className={`skill-badge ${skill.severity}`}>
                {skill.skill}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Interview;
