import React, { useState, useEffect } from 'react';

const PresetManager = () => {
  const [presets, setPresets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Default template using Software preset
  const defaultPreset = {
    name: '',
    data: {
      userName: "Shin Ting Lin",
      summary: "Highly adaptable individual with strong communication skills and a passion for working in fast-paced environments...",
      skills: "Back-End:Node.js / Express.js Python / Django Linux MVC...",
      experience: "project experience: BeatMatcher (Full Stack)...",
      workexperience: "WORK EXPERIENCE: Music Producer 2018 – 2022...",
      education: "National Taiwan Normal University 2013 – 2018...",
      cvReference: "Dear Hiring Manager, I am writing to express my interest..."
    }
  };

  const [currentPreset, setCurrentPreset] = useState(defaultPreset);

  // Load presets from localStorage on component mount
  useEffect(() => {
    const savedPresets = localStorage.getItem('coverLetterPresets');
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets));
    }
  }, []);

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setCurrentPreset(prev => ({
        ...prev,
        name: value
      }));
    } else {
      setCurrentPreset(prev => ({
        ...prev,
        data: {
          ...prev.data,
          [name]: value
        }
      }));
    }
  };

  // Save or update preset
  const savePreset = () => {
    if (!currentPreset.name.trim()) {
      alert('Please enter a preset name');
      return;
    }

    // Check for duplicate names when creating new preset
    if (!isEditing && presets.some(p => p.name === currentPreset.name)) {
      alert('A preset with this name already exists');
      return;
    }

    const updatedPresets = isEditing
      ? presets.map(p => p.name === currentPreset.name ? currentPreset : p)
      : [...presets, currentPreset];

    setPresets(updatedPresets);
    localStorage.setItem('coverLetterPresets', JSON.stringify(updatedPresets));
    resetForm();
    alert(isEditing ? 'Preset updated successfully!' : 'New preset saved!');
  };

  // Delete preset
  const deletePreset = (presetName) => {
    if (window.confirm('Are you sure you want to delete this preset?')) {
      const updatedPresets = presets.filter(p => p.name !== presetName);
      setPresets(updatedPresets);
      localStorage.setItem('coverLetterPresets', JSON.stringify(updatedPresets));
    }
  };

  // Edit preset
  const editPreset = (preset) => {
    setCurrentPreset(preset);
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setCurrentPreset(defaultPreset);
    setIsEditing(false);
  };

  return (
    <div className="preset-manager">
      <h2>Preset Manager</h2>
      
      <div className="preset-form">
        <h3>{isEditing ? 'Edit Preset' : 'Add New Preset'}</h3>
        
        <div className="form-group">
          <label>Preset Name:</label>
          <input
            type="text"
            name="name"
            value={currentPreset.name}
            onChange={handleInputChange}
            placeholder="Enter preset name"
            disabled={isEditing}
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="userName"
            value={currentPreset.data.userName}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Summary:</label>
          <textarea
            name="summary"
            value={currentPreset.data.summary}
            onChange={handleInputChange}
            placeholder="Enter your professional summary"
          />
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <textarea
            name="skills"
            value={currentPreset.data.skills}
            onChange={handleInputChange}
            placeholder="Enter your skills"
          />
        </div>

        <div className="form-group">
          <label>Project Experience:</label>
          <textarea
            name="experience"
            value={currentPreset.data.experience}
            onChange={handleInputChange}
            placeholder="Enter your project experience"
          />
        </div>

        <div className="form-group">
          <label>Work Experience:</label>
          <textarea
            name="workexperience"
            value={currentPreset.data.workexperience}
            onChange={handleInputChange}
            placeholder="Enter your work experience"
          />
        </div>

        <div className="form-group">
          <label>Education:</label>
          <textarea
            name="education"
            value={currentPreset.data.education}
            onChange={handleInputChange}
            placeholder="Enter your education background"
          />
        </div>

        <div className="form-group">
          <label>CV Reference:</label>
          <textarea
            name="cvReference"
            value={currentPreset.data.cvReference}
            onChange={handleInputChange}
            placeholder="Enter your CV reference"
          />
        </div>

        <div className="button-group">
          <button onClick={savePreset} className="primary">
            {isEditing ? 'Update Preset' : 'Save Preset'}
          </button>
          {isEditing && (
            <button onClick={resetForm} className="secondary">
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <div className="preset-list">
        <h3>Saved Presets</h3>
        {presets.map((preset, index) => (
          <div key={index} className="preset-item">
            <h4>{preset.name}</h4>
            <div className="preset-actions">
              <button onClick={() => editPreset(preset)} className="edit">
                Edit
              </button>
              <button 
                onClick={() => deletePreset(preset.name)}
                className="delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresetManager;
