import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const CoverLetterGenerator = () => {
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [workexperience, setWorkExperience] = useState('');
  const [education, setEducation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyProducts, setCompanyProducts] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [cvReference, setCvReference] = useState('');
  const [presets, setPresets] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load presets from local JSON file when component mounts
  useEffect(() => {
    const fetchPresets = async () => {
      try {
        const response = await fetch('./preset.json');
        const data = await response.json();
        setPresets(data.presets);
      } catch (error) {
        console.error('Error loading presets:', error);
      }
    };

    fetchPresets();
  }, []);

  const savePreset = () => {
    const newPreset = {
      summary,
      skills,
      experience,
      workexperience,
      education,
      jobTitle,
      jobDescription,
      cvReference,
      companyProducts
    };
    setPresets([...presets, newPreset]);
  };

  const loadPreset = (preset) => {
    setSummary(preset.summary);
    setSkills(preset.skills);
    setExperience(preset.experience);
    setWorkExperience(preset.workexperience);
    setEducation(preset.education);
    setJobTitle(preset.jobTitle);
    setJobDescription(preset.jobDescription);
    setCvReference(preset.cvReference)
    setCompanyProducts(preset.companyProducts);
  };

  const generateCoverLetter = async () => {
    try {
      const apiKey = localStorage.getItem('openaiApiKey');
      if (!apiKey) {
        alert('請先設置 OpenAI API 密鑰');
        return;
      }

      setIsLoading(true);
      const response = await axios.post('https://cover-letter-app-237142443924.asia-east1.run.app/generate-cover-letter', {
        summary,
        skills,
        experience,
        workexperience,
        education,
        jobTitle,
        jobDescription,
        companyProducts,
        cvReference,
        apiKey
      });
      setGeneratedCoverLetter(response.data.coverLetter.content);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setIsLoading(false);
      alert('生成求職信時發生錯誤，請確保已設置有效的 API 密鑰');
    }
  };

  const copyToClipboard = async() => {
    navigator.clipboard.writeText(generatedCoverLetter)
      .then(() => {})
      .catch((error) => console.error('Error copying to clipboard:', error));
  };

  const saveAsPDF = (content) => {
    const doc = new jsPDF();

    // Add blank lines at the top for spacing
    const lineHeight = 10;
    const numLines = 2; // Adjust the number of lines as needed
    const blankLines = Array(numLines).fill('').join('\n');
    doc.text(blankLines, 10, 10);

    // Split the content into lines
    const lines = doc.splitTextToSize(content, 180);

    // Add the lines to the PDF
    doc.text(lines, 10, 10 + lineHeight * numLines);

    doc.save(`Shin Ting Lin_${jobTitle}cover_letter.pdf`); // Save the PDF file with a specified name
  };


  return (
    <div>
      <div>
        {/* 輸入摘要、技能、經驗、教育等信息 */}
        {/* 範例： */}
        <label>Summary</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" />
        <label>Skills</label>
        <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills" />
        <label>Project Experience</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" />
        <label>Work Experience</label>
        <textarea value={workexperience} onChange={(e) => setWorkExperience(e.target.value)} placeholder="WorkExperience" />
        <label>Education</label>
        <textarea value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Education" />
      </div>
      <div>
        <label>Job Title</label>
        <textarea value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" />
        <label>Job Description</label>
        <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Job Description" />
        <label>Company Products</label>
        <textarea value={companyProducts} onChange={(e) => setCompanyProducts(e.target.value)} placeholder="Company Products" />
      </div>
      <div>
        <label>CV reference</label>
        <textarea value={cvReference} onChange={(e) => setCvReference(e.target.value)} placeholder="CvReference" />
      </div>
      <button onClick={generateCoverLetter}>Generate Cover Letter</button>
      <button onClick={savePreset}>Save Preset</button>
      <select onChange={(e) => {
        setSelectedPreset(e.target.value);
        loadPreset(JSON.parse(e.target.value));
      }}>
        <option value="">Select Preset</option>
        {presets.map((preset, index) => (
          <option key={index} value={JSON.stringify(preset)}>Preset {index + 1}</option>
        ))}
      </select>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
      <div>
        {/* Display the generated cover letter */}
        {generatedCoverLetter && (
          <div>
            <h2>Generated Cover Letter:</h2>
            <textarea
              value={generatedCoverLetter}
              rows="10" cols="50"
              readOnly
              style={{ resize: 'none' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
