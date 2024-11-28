import logo from './logo.svg';
import './App.css';
import CoverLetterGenerator from './CoverLetterGenerator';
import ApiKeyInput from './ApiKeyInput';

function App() {
  const handleApiKeySubmit = (apiKey) => {
    // 這裡可以處理API密鑰
    console.log('API Key received:', apiKey);
    // TODO: 將API密鑰傳遞給後端或其他組件
  };

  return (
    <div className="App">
      <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
      <CoverLetterGenerator />
    </div>
  );
}

export default App;
