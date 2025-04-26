import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Policy.css';

const CookiePolicy: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="policy-container">
      <button className="back-button" onClick={() => navigate('/')}>返回主頁</button>
      <div className="policy-content">
        <h1>Cookie 政策</h1>
        <p className="last-updated">最後更新日期：2024年4月15日</p>
        
        <section>
          <h2>1. 關於 Cookie</h2>
          <p>Cookie 是保存在您的設備上的小型文本文件，當您訪問網站時，網站會將這些文件放置在您的設備上。它們用於記住您的偏好設置、了解您如何使用網站以及讓您的體驗更加個性化和高效。</p>
        </section>
        
        <section>
          <h2>2. 我們使用的 Cookie 類型</h2>
          <p>我們使用以下類型的 Cookie：</p>
          <ul>
            <li><strong>必要性 Cookie</strong>：這些 Cookie 對於網站的基本功能是必需的，無法關閉。</li>
            <li><strong>性能 Cookie</strong>：這些 Cookie 收集有關您如何使用我們的網站的信息，幫助我們改進其功能。</li>
            <li><strong>功能性 Cookie</strong>：這些 Cookie 使網站能夠記住您的設置和偏好，提供更個性化的功能。</li>
            <li><strong>廣告 Cookie</strong>：這些 Cookie 由我們或我們的廣告合作夥伴放置，用於提供更相關的廣告內容。</li>
          </ul>
        </section>
        
        <section>
          <h2>3. 我們如何使用 Cookie</h2>
          <table className="cookie-table">
            <thead>
              <tr>
                <th>Cookie 類型</th>
                <th>目的</th>
                <th>存儲期限</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>會話 Cookie</td>
                <td>用於記住您的語言選擇和當前的測試設置</td>
                <td>會話期間（關閉瀏覽器後刪除）</td>
              </tr>
              <tr>
                <td>永久性 Cookie</td>
                <td>存儲您的高分和打字紀錄</td>
                <td>一年</td>
              </tr>
              <tr>
                <td>分析 Cookie</td>
                <td>收集有關網站使用情況的數據以改進用戶體驗</td>
                <td>兩年</td>
              </tr>
              <tr>
                <td>廣告 Cookie</td>
                <td>顯示您可能感興趣的廣告</td>
                <td>90天</td>
              </tr>
              <tr>
                <td>Cookie 同意</td>
                <td>記錄您對 Cookie 政策的同意</td>
                <td>一年</td>
              </tr>
            </tbody>
          </table>
        </section>
        
        <section>
          <h2>4. 第三方 Cookie</h2>
          <p>我們的網站可能包含來自第三方的 Cookie，如 Google Analytics 和 Google AdSense。這些 Cookie 收集的信息由這些第三方控制，並受其各自的隱私政策約束。</p>
        </section>
        
        <section>
          <h2>5. 如何管理 Cookie</h2>
          <p>大多數網絡瀏覽器允許您通過設置控制 Cookie。您可以：</p>
          <ul>
            <li>刪除瀏覽器中已有的 Cookie</li>
            <li>阻止瀏覽器接受新的 Cookie</li>
            <li>設置瀏覽器在收到新 Cookie 時通知您</li>
            <li>禁用所有 Cookie 或僅禁用第三方 Cookie</li>
          </ul>
          <p>請注意，如果您選擇禁用 Cookie，本網站的某些功能可能無法正常工作。</p>
          
          <h3>瀏覽器設置說明</h3>
          <ul>
            <li><strong>Chrome</strong>：設置 → 隱私和安全 → Cookie 和其他網站數據</li>
            <li><strong>Firefox</strong>：選項 → 隱私與安全 → Cookie 和網站數據</li>
            <li><strong>Safari</strong>：偏好設置 → 隱私 → Cookie 和網站數據</li>
            <li><strong>Edge</strong>：設置 → Cookie 和網站權限</li>
          </ul>
        </section>
        
        <section>
          <h2>6. 選擇退出</h2>
          <p>您可以通過以下方式選擇退出我們的廣告 Cookie：</p>
          <ul>
            <li>使用我們網站上的 Cookie 設置面板</li>
            <li>訪問 <a href="http://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a></li>
            <li>使用您設備上的廣告 ID 設置</li>
          </ul>
        </section>
        
        <section>
          <h2>7. Cookie 政策的變更</h2>
          <p>我們可能會不時更新我們的 Cookie 政策。任何更改都將在本頁面上發布，如有重大更改，我們將在我們的網站上提供更顯著的通知。</p>
        </section>
        
        <section>
          <h2>8. 聯繫我們</h2>
          <p>如果您對我們的 Cookie 政策有任何疑問或擔憂，請通過以下方式聯繫我們：</p>
          <p>電子郵件：emhw.0930@berkeley.edu</p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy; 