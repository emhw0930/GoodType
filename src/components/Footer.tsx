import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/privacy-policy">隱私政策</Link>
          <Link to="/cookie-policy">Cookie政策</Link>
          <Link to="/terms-of-service">使用條款</Link>
          <Link to="/ad-disclosure">廣告政策</Link>
          <Link to="/about">關於我們</Link>
        </div>
        <div className="footer-copyright">
          © 2024 GoodType. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 