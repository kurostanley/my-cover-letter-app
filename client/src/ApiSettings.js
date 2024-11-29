import React, { useState, useEffect } from 'react';

const ApiSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [promptTemplate, setPromptTemplate] = useState(
    `User Information: {userInformation}
Company Information: {companyInformation}
Cover letter reference: {cvReference}
---
please use the information above help me (my name is {userName}) to generate a cover letter for company as {jobTitle}, which relate to about {userName}'s uniqueness and his personal life with the company's product(if you can research by your database) and give me clean subject title as well. use the writing style of {cvReference}. Keep within 150 words long.`
  );

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openaiApiKey');
    const savedPrompt = localStorage.getItem('promptTemplate');

    if (savedApiKey) setApiKey(savedApiKey);
    if (savedPrompt) setPromptTemplate(savedPrompt);
  }, []);

  const saveSettings = () => {
    localStorage.setItem('openaiApiKey', apiKey);
    localStorage.setItem('promptTemplate', promptTemplate);
    alert('Settings saved successfully!');
  };

  const resetPrompt = () => {
    const defaultPrompt = 
    `User Information: {userInformation}
Company Information: {companyInformation}
Cover letter reference: {cvReference}
---
please use the information above help me (my name is {userName}) to generate a cover letter for company as {jobTitle}, which relate to about {userName}'s uniqueness and his personal life with the company's product(if you can research by your database) and give me clean subject title as well. use the writing style of {cvReference}. Keep within 150 words long.`;
    
    setPromptTemplate(defaultPrompt);
  };

  return (
    <div className="api-settings">
      <h2>API Settings</h2>
      <div className="settings-container">
        <div className="form-group">
          <label>OpenAI API Key:</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API Key"
            className="api-input"
          />
        </div>

        <div className="form-group">
          <label>Prompt Settings:</label>
          <div className="prompt-help">
            <p>Available variables:</p>
            <ul>
              <li><code>{'{userName}'}</code> - User's name</li>
              <li><code>{'{userInformation}'}</code> - User information (summary, skills, experience)</li>
              <li><code>{'{companyInformation}'}</code> - Company information (job description)</li>
              <li><code>{'{jobTitle}'}</code> - Position title</li>
              <li><code>{'{cvReference}'}</code> - CV reference</li>
            </ul>
          </div>
          <textarea
            value={promptTemplate}
            onChange={(e) => setPromptTemplate(e.target.value)}
            rows="10"
            className="prompt-textarea"
          />
        </div>

        <div className="button-group">
          <button onClick={saveSettings} className="primary">
            Save Settings
          </button>
          <button onClick={resetPrompt} className="secondary">
            Reset Default Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;