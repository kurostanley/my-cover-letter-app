import { useState } from 'react';

function ApiKeyInput({ onApiKeySubmit }) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 檢查 API 密鑰格式
    if (!apiKey.startsWith('sk-')) {
      alert('請輸入有效的 OpenAI API 密鑰 (應該以 sk- 開頭)');
      return;
    }

    // 保存到 localStorage
    localStorage.setItem('openaiApiKey', apiKey);
    alert('API 密鑰保存成功！');
    
    // 如果有傳入回調函數，則調用它
    if (onApiKeySubmit) {
      onApiKeySubmit(apiKey);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="輸入你的 OpenAI API 密鑰"
          style={{
            padding: '8px',
            marginRight: '10px',
            width: '300px'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          保存 API 密鑰
        </button>
      </form>
    </div>
  );
}

export default ApiKeyInput;