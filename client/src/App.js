import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CoverLetterGenerator from './CoverLetterGenerator';
import PresetManager from './PresetManager';
import ApiSettings from './ApiSettings';
import UserGuide from './UserGuide';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Cover Letter Generator</Link></li>
            <li><Link to="/presets">Preset Manager</Link></li>
            <li><Link to="/settings">API Settings</Link></li>
            <li><Link to="/guide">User Guide</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CoverLetterGenerator />} />
          <Route path="/presets" element={<PresetManager />} />
          <Route path="/settings" element={<ApiSettings />} />
          <Route path="/guide" element={<UserGuide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
