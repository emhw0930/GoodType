import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectLanguage = (language: 'english' | 'chinese') => {
    navigate(`/${language}`);
  };

  return (
    <div className="language-selector">
      <h1>中文繁體打字練習</h1>
      <h2>選擇打字練習語言</h2>
      <div className="language-buttons">
        <button 
          className="language-button" 
          onClick={() => handleSelectLanguage('english')}
        >
          English
        </button>
        <button 
          className="language-button" 
          onClick={() => handleSelectLanguage('chinese')}
        >
          中文
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector; 