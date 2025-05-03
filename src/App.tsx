import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import ChineseTypingTest from './components/ChineseTypingTest';
import EnglishTypingTest from './components/EnglishTypingTest';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import TermsOfService from './components/TermsOfService';
import AdDisclosure from './components/AdDisclosure';
import About from './components/About';
import Footer from './components/Footer';
import GoogleAdsense from './components/GoogleAdsense';

// Helper component to conditionally render ads
const AdWrapper: React.FC = () => {
  const location = useLocation();
  const shouldShowAds = ['/chinese', '/english', '/'].includes(location.pathname);
  return <GoogleAdsense shouldLoadAds={shouldShowAds} />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <AdWrapper />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<ChineseTypingTest />} />
            <Route path="/chinese" element={<ChineseTypingTest />} />
            <Route path="/english" element={<EnglishTypingTest />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/ad-disclosure" element={<AdDisclosure />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
