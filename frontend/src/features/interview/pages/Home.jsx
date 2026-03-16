import React, { useState } from 'react'
import "../style/Home.scss"

const Home = () => {
  const [formData, setFormData] = useState({
    jobDescription: '',
    resume: null,
    selfDescription: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      resume: file
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Add API call here
    console.log('Form Data:', formData)
    setIsLoading(false)
  }

  return (
    <main className='home-container'>
      <div className='home-wrapper'>
        {/* Header Section */}
        <div className='header-section'>
          <h1>Interview Preparation</h1>
          <p>Upload your resume and job description to generate a personalized interview report</p>
        </div>

        {/* Form Section */}
        <form className='form-section' onSubmit={handleSubmit}>
          {/* Left Side - Job Description */}
          <div className='form-column left-column'>
            <div className='form-group'>
              <label htmlFor='jobDescription' className='form-label'>
                <span className='label-text'>Job Description</span>
                <span className='label-icon'>📋</span>
              </label>
              <textarea
                name='jobDescription'
                id='jobDescription'
                placeholder='Paste the job description here...'
                value={formData.jobDescription}
                onChange={handleInputChange}
                className='textarea-input'
                required
              ></textarea>
              <p className='helper-text'>Provide the complete job description to generate relevant interview questions</p>
            </div>
          </div>

          {/* Right Side - Resume & Self Description */}
          <div className='form-column right-column'>
            {/* Resume Upload */}
            <div className='form-group'>
              <label htmlFor='resume' className='form-label'>
                <span className='label-text'>Upload Resume</span>
                <span className='label-icon'>📄</span>
              </label>
              <div className='file-input-wrapper'>
                <input
                  type='file'
                  name='resume'
                  id='resume'
                  accept='.pdf,.doc,.docx'
                  onChange={handleFileChange}
                  className='file-input'
                />
                <div className='file-input-label'>
                  {formData.resume ? (
                    <>
                      <span className='file-icon'>✓</span>
                      <span>{formData.resume.name}</span>
                    </>
                  ) : (
                    <>
                      <span className='file-icon'>📁</span>
                      <span>Choose File or drag and drop</span>
                    </>
                  )}
                </div>
              </div>
              <p className='helper-text'>Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>

            {/* Self Description */}
            <div className='form-group'>
              <label htmlFor='selfDescription' className='form-label'>
                <span className='label-text'>Self Description</span>
                <span className='label-icon'>👤</span>
              </label>
              <textarea
                name='selfDescription'
                id='selfDescription'
                placeholder='Describe your experience, skills, and career goals...'
                value={formData.selfDescription}
                onChange={handleInputChange}
                className='textarea-input'
                required
              ></textarea>
              <p className='helper-text'>Help us understand your background and expertise</p>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Generating Report...' : 'Generate Interview Report'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Home