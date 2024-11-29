import React from 'react';

const UserGuide = () => {
  return (
    <div className="user-guide">
      <h1>User Guide</h1>
      
      <section className="guide-section">
        <h2>Getting Started</h2>
        <p>To start generating personalized cover letters, follow these steps:</p>
        <ol>
          <li>Set up your OpenAI API key in the API Settings page</li>
          <li>Create or modify your preset in the Preset Manager</li>
          <li>Generate your cover letter on the main page</li>
        </ol>
      </section>

      <section className="guide-section">
        <h2>API Settings</h2>
        <p>Before using the application, you need to:</p>
        <ol>
          <li>Get an OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI's website</a></li>
          <li>Enter your API key in the API Settings page</li>
          <li>The prompt template is pre-configured but can be customized if needed</li>
        </ol>
      </section>

      <section className="guide-section">
        <h2>Preset Manager</h2>
        <p>Create and manage your personal information presets:</p>
        <ul>
          <li><strong>Name:</strong> Your full name for the cover letter</li>
          <li><strong>Summary:</strong> Brief introduction about yourself</li>
          <li><strong>Skills:</strong> Your technical and soft skills</li>
          <li><strong>Project Experience:</strong> Notable projects you've worked on</li>
          <li><strong>Work Experience:</strong> Your professional background</li>
          <li><strong>Education:</strong> Your educational background</li>
          <li><strong>CV Reference:</strong> A reference cover letter style</li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>Generating Cover Letters</h2>
        <p>On the main page:</p>
        <ol>
          <li>Select a preset from your saved templates</li>
          <li>Enter the job title you're applying for</li>
          <li>Paste the job description</li>
          <li>Click "Generate" to create your personalized cover letter</li>
          <li>Review and copy the generated content</li>
        </ol>
      </section>

      <section className="guide-section">
        <h2>Tips for Best Results</h2>
        <ul>
          <li>Keep your preset information clear and concise</li>
          <li>Include specific achievements and metrics in your experience</li>
          <li>Provide a detailed job description for better targeting</li>
          <li>Use the CV Reference to maintain consistent writing style</li>
          <li>Review and adjust the generated letter if needed</li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>Troubleshooting</h2>
        <ul>
          <li><strong>API Error:</strong> Verify your OpenAI API key is correct and has sufficient credits</li>
          <li><strong>Generation Failed:</strong> Try refreshing the page or checking your internet connection</li>
          <li><strong>Preset Not Saving:</strong> Ensure all required fields are filled</li>
          <li><strong>Poor Results:</strong> Try providing more detailed information in your preset and job description</li>
        </ul>
      </section>
    </div>
  );
};

export default UserGuide;