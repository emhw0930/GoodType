import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectLanguage = (language: 'english' | 'chinese') => {
    navigate(`/${language}`);
  };

  return (
    <main className="language-selector">
      <header>
        <h1>中文繁體打字練習</h1>
        <h2>選擇打字練習語言</h2>
      </header>
      <nav className="language-buttons" aria-label="語言選擇">
        <button 
          className="language-button" 
          onClick={() => handleSelectLanguage('english')}
          aria-label="選擇英文打字練習"
        >
          English
        </button>
        <button 
          className="language-button" 
          onClick={() => handleSelectLanguage('chinese')}
          aria-label="選擇中文打字練習"
        >
          中文
        </button>
      </nav>
    </main>
  );
};

export default LanguageSelector; 