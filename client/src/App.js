import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CoverLetterGenerator from './CoverLetterGenerator';
import PresetManager from './PresetManager';
import ApiSettings from './ApiSettings';
import UserGuide from './UserGuide';
import AboutAuthor from './AboutAuthor';
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
            <li><Link to="/about">About Author</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CoverLetterGenerator />} />
          <Route path="/presets" element={<PresetManager />} />
          <Route path="/settings" element={<ApiSettings />} />
          <Route path="/guide" element={<UserGuide />} />
          <Route path="/about" element={<AboutAuthor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
