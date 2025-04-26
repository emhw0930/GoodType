import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Policy.css';

const About: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="policy-container">
      <button className="back-button" onClick={() => navigate('/')}>
        返回主頁
      </button>
      
      <div className="policy-content">
        <h1>關於我們</h1>
        <p className="last-updated">最後更新: 2024年4月15日</p>
        
        <section>
          <h2>我們的使命</h2>
          <p>
            GoodType 致力於為所有人提供高質量的打字練習體驗。我們相信，良好的打字技能對於現代數字世界中的溝通和效率至關重要。
            我們的使命是創建一個直觀、有效且有趣的平台，幫助用戶提高他們的中文和英文打字速度與準確性。
          </p>
        </section>
        
        <section>
          <h2>我們的故事</h2>
          <p>
            GoodType 始於一位開發者的簡單需求 - 找到一個能夠同時練習中文和英文打字的好工具。
            在發現市場上的解決方案要麼過於複雜，要麼功能不足後，我們決定自己動手創建一個完美平衡的應用程序。
          </p>
          <p>
            從最初的原型到現在的成熟產品，我們一直專注於用戶體驗和學習效果，
            不斷收集反饋並改進我們的平台，以滿足各種程度的學習者需求。
          </p>
        </section>
        
        <section>
          <h2>我們的產品</h2>
          <p>
            GoodType 提供以下核心功能：
          </p>
          <ul>
            <li><strong>雙語支持</strong> - 同時提供中文（繁體）和英文打字練習</li>
            <li><strong>實時反饋</strong> - 立即顯示打字準確性和速度數據</li>
            <li><strong>進度追踪</strong> - 保存歷史成績，展示個人進步</li>
            <li><strong>簡潔界面</strong> - 專注於打字體驗的極簡設計</li>
            <li><strong>個性化設置</strong> - 調整練習時間和顯示偏好</li>
          </ul>
        </section>
        
        <section>
          <h2>我們的團隊</h2>
          <p>
            GoodType 由一支熱衷於語言學習和技術的小團隊開發。我們的團隊成員擁有多語言背景和豐富的軟件開發經驗，
            共同致力於創建最好的打字練習工具。
          </p>
        </section>
        
        <section>
          <h2>我們的價值觀</h2>
          <ul>
            <li><strong>用戶至上</strong> - 我們所有的決策都以用戶體驗為中心</li>
            <li><strong>持續改進</strong> - 我們不斷尋求反饋並改進我們的產品</li>
            <li><strong>簡約設計</strong> - 我們相信簡單而精心設計的工具最有效</li>
            <li><strong>開放透明</strong> - 我們誠實地與用戶交流我們的做法和政策</li>
            <li><strong>包容多樣</strong> - 我們致力於創建適合各種背景用戶的產品</li>
          </ul>
        </section>
        
        <section>
          <h2>聯繫我們</h2>
          <p>
            我們歡迎您的反饋和建議！請通過以下方式與我們聯繫：
          </p>
          <p>
            電子郵件：<a href="mailto:emhw.0930@berkeley.edu">emhw.0930@berkeley.edu</a>
          </p>
        </section>
        
        <section>
          <h2>法律信息</h2>
          <p>
            請查閱我們的以下政策文件，了解更多關於我們如何運營的信息：
          </p>
          <ul>
            <li><a href="/privacy-policy">隱私政策</a></li>
            <li><a href="/cookie-policy">Cookie 政策</a></li>
            <li><a href="/terms-of-service">使用條款</a></li>
            <li><a href="/ad-disclosure">廣告政策</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About; 