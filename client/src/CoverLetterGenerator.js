import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoverLetterGenerator = () => {
  const [presets, setPresets] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load presets from localStorage
  useEffect(() => {
    const loadPresets = () => {
      const savedPresets = localStorage.getItem('coverLetterPresets');
      if (savedPresets) {
        setPresets(JSON.parse(savedPresets));
      }
    };

    loadPresets();
    // Add event listener to detect localStorage changes
    window.addEventListener('storage', loadPresets);
    
    return () => {
      window.removeEventListener('storage', loadPresets);
    };
  }, []);

  const generateCoverLetter = async () => {
    if (!selectedPresetId) {
      alert('Please select a preset template');
      return;
    }

    if (!jobTitle.trim() || !jobDescription.trim()) {
      alert('Please fill in both job title and job description');
      return;
    }

    const selectedPreset = presets.find(preset => preset.name === selectedPresetId);
    if (!selectedPreset) {
      alert('Selected preset template not found');
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = localStorage.getItem('openaiApiKey');
      if (!apiKey) {
        alert('Please set your OpenAI API Key in the API Settings page first');
        return;
      }

      const response = await axios.post('http://localhost:3001/generate-cover-letter', {
        ...selectedPreset.data,
        jobTitle,
        jobDescription,
        apiKey
      });
      
      setGeneratedCoverLetter(response.data.coverLetter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Error generating cover letter: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cover-letter-generator">
      <h2>Cover Letter Generator</h2>
      
      <div className="main-form">
        <div className="form-group">
          <label>Select Preset Template:</label>
          <select 
            value={selectedPresetId} 
            onChange={(e) => setSelectedPresetId(e.target.value)}
          >
            <option value="">Choose a preset template</option>
            {presets.map((preset) => (
              <option key={preset.name} value={preset.name}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter the job title you're applying for"
          />
        </div>

        <div className="form-group">
          <label>Job Description:</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here"
          />
        </div>

        <button 
          onClick={generateCoverLetter}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Cover Letter'}
        </button>

        {selectedPresetId && (
          <div className="selected-preset-info">
            <h4>Selected Template Information:</h4>
            <p>{presets.find(p => p.name === selectedPresetId)?.name}</p>
          </div>
        )}

        {generatedCoverLetter && (
          <div className="generated-content">
            <h3>Generated Cover Letter:</h3>
            <textarea
              value={generatedCoverLetter}
              readOnly
              rows="10"
            />
            <div className="button-group">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedCoverLetter);
                  alert('Copied to clipboard!');
                }}
              >
                Copy Content
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
