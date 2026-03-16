import React, { useState } from 'react'
import '../style/interview.scss'

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical')

  // Sample data - replace with actual data from props or API
  const reportData = {
    matchScore: 80,
    technicalQuestions: [
      {
        question: "What is the difference between RESTful APIs and GraphQL?",
        intention: "To assess the candidate's understanding of API design and development",
        answer: "RESTful APIs follow a request-response architecture, whereas GraphQL is a query language for APIs that allows for more flexible and efficient data retrieval."
      },
      {
        question: "How do you handle authentication and authorization in a MERN stack application?",
        intention: "To evaluate the candidate's knowledge of security best practices",
        answer: "I use JSON Web Tokens (JWT) for authentication and authorization, which provides a secure and efficient way to manage user sessions and access control."
      }
    ],
    behavioralQuestions: [
      {
        question: "Can you describe a project you worked on that involved collaboration with a team?",
        intention: "To evaluate the candidate's teamwork and communication skills",
        answer: "In my previous internship, I worked on a team project where we developed a web application using the MERN stack."
      },
      {
        question: "How do you handle conflicts or disagreements with team members?",
        intention: "To assess the candidate's conflict resolution and interpersonal skills",
        answer: "I believe in open communication and active listening."
      }
    ],
    skillGaps: [
      { skill: "TypeScript", severity: "medium" },
      { skill: "CI/CD pipelines", severity: "low" },
      { skill: "Cloud platforms (AWS, Azure)", severity: "medium" }
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "Review of MERN stack fundamentals",
        tasks: ["Review React.js documentation", "Practice building a simple RESTful API"]
      },
      {
        day: 2,
        focus: "Practice solving technical questions",
        tasks: ["Solve problems on HackerRank or LeetCode", "Practice whiteboarding exercises"]
      },
      {
        day: 3,
        focus: "Review of behavioral questions and soft skills",
        tasks: ["Prepare examples of past experiences", "Practice answering behavioral questions"]
      }
    ]
  }

  const questionsToDisplay = activeTab === 'technical' ? reportData.technicalQuestions : reportData.behavioralQuestions

  return (
    <div className='interview-container'>
      {/* Left Sidebar */}
      <aside className='sidebar-left'>
        <nav className='nav-menu'>
          <button 
            className={`nav-item ${activeTab === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            Technical questions
          </button>
          <button 
            className={`nav-item ${activeTab === 'behavioral' ? 'active' : ''}`}
            onClick={() => setActiveTab('behavioral')}
          >
            Behavioral questions
          </button>
          <button 
            className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            Road Map
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className='main-content'>

        {activeTab === 'technical' && (
          <div className='questions-section'>
            <h3>Technical Questions</h3>
            <div className='questions-list'>
              {questionsToDisplay.map((item, index) => (
                <div key={index} className='question-card'>
                  <div className='question-header'>
                    <h4>{item.question}</h4>
                  </div>
                  <div className='question-body'>
                    <p><strong>Intention:</strong> {item.intention}</p>
                    <p><strong>Answer:</strong> {item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'behavioral' && (
          <div className='questions-section'>
            <h3>Behavioral Questions</h3>
            <div className='questions-list'>
              {questionsToDisplay.map((item, index) => (
                <div key={index} className='question-card'>
                  <div className='question-header'>
                    <h4>{item.question}</h4>
                  </div>
                  <div className='question-body'>
                    <p><strong>Intention:</strong> {item.intention}</p>
                    <p><strong>Answer:</strong> {item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className='roadmap-section'>
            <h3>Preparation Road Map</h3>
            <div className='roadmap-list'>
              {reportData.preparationPlan.map((day) => (
                <div key={day.day} className='roadmap-card'>
                  <div className='day-header'>
                    <h4>Day {day.day}</h4>
                    <p className='focus'>{day.focus}</p>
                  </div>
                  <div className='tasks'>
                    {day.tasks.map((task, idx) => (
                      <div key={idx} className='task-item'>✓ {task}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className='sidebar-right'>
        <div className='score-section'>
          <h3>Match Score</h3>
          <div className='score-display'>{reportData.matchScore}%</div>
        </div>

        <div className='skill-gaps-section'>
          <h3>Skill Gaps</h3>
          <div className='skill-list'>
            {reportData.skillGaps.map((skill, index) => (
              <button 
                key={index} 
                className={`skill-badge ${skill.severity}`}
              >
                {skill.skill}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Interview