import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import EnglishTypingTest from './components/EnglishTypingTest';
import ChineseTypingTest from './components/ChineseTypingTest';
import './App.css';

const App: React.FC = () => {
  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LanguageSelector />} />
          <Route path="/english" element={<EnglishTypingTest onBack={handleBack} />} />
          <Route path="/chinese" element={<ChineseTypingTest onBack={handleBack} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
