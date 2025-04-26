import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Policy.css';

const AdDisclosure: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="policy-container">
      <button className="back-button" onClick={() => navigate('/')}>
        返回主頁
      </button>
      
      <div className="policy-content">
        <h1>廣告政策</h1>
        <p className="last-updated">最後更新: 2024年4月15日</p>
        
        <section>
          <p>
            感謝您使用我們的打字練習應用程序。本文檔概述了我們如何在應用程序中使用廣告，以及您對此的選擇。
          </p>
        </section>
        
        <section>
          <h2>廣告類型</h2>
          <p>
            我們的應用程序可能包含以下類型的廣告：
          </p>
          <ul>
            <li>橫幅廣告 - 出現在應用程序的頂部或底部</li>
            <li>插頁廣告 - 全屏廣告，可能在練習環節之間出現</li>
            <li>獎勵廣告 - 您可以選擇觀看的廣告，以獲得額外功能</li>
          </ul>
        </section>
        
        <section>
          <h2>廣告提供商</h2>
          <p>
            我們使用第三方廣告網絡來顯示廣告，包括但不限於：
          </p>
          <ul>
            <li>Google AdMob</li>
            <li>Facebook Audience Network</li>
            <li>Unity Ads</li>
          </ul>
          <p>
            這些提供商可能會使用自己的Cookie和識別符來衡量廣告效果並提供相關廣告。
          </p>
        </section>
        
        <section>
          <h2>定向廣告</h2>
          <p>
            為了提供更相關的廣告體驗，我們的廣告合作夥伴可能會使用有關您的信息，包括：
          </p>
          <ul>
            <li>您的設備信息（型號、操作系統版本等）</li>
            <li>IP位置信息（大致地理位置）</li>
            <li>應用程序使用信息</li>
            <li>獨特的應用程序識別符</li>
          </ul>
          <p>
            這些信息用於選擇可能與您相關的廣告，但不會識別您的個人身份。
          </p>
        </section>
        
        <section>
          <h2>廣告識別</h2>
          <p>
            所有廣告內容都會標有"廣告"或類似標識，以便您輕鬆區分廣告內容和應用程序內容。
          </p>
        </section>
        
        <section>
          <h2>兒童隱私</h2>
          <p>
            我們的應用程序不針對13歲以下的兒童。我們不會故意從兒童那裡收集個人信息，也不會向13歲以下的用戶展示個性化廣告。
          </p>
        </section>
        
        <section>
          <h2>您的選擇</h2>
          <p>
            您可以通過以下方式管理廣告體驗：
          </p>
          <ul>
            <li>
              <strong>設備設置：</strong> 您可以在設備設置中重置您的廣告ID或選擇退出基於興趣的廣告
            </li>
            <li>
              <strong>升級至無廣告版本：</strong> 我們提供付費選項，移除所有非必要廣告
            </li>
          </ul>
          <p>
            請注意，即使您選擇退出個性化廣告，您仍然會看到廣告，但這些廣告可能與您的興趣無關。
          </p>
        </section>
        
        <section>
          <h2>隱私實踐</h2>
          <p>
            有關我們如何收集、使用和保護您信息的更多詳細信息，請查看我們的 
            <a href="/privacy-policy">隱私政策</a>。
          </p>
        </section>
        
        <section>
          <h2>反饋與問題</h2>
          <p>
            如果您對我們的廣告實踐有任何問題或疑慮，請通過 
            <a href="mailto:support@typingpractice.com">support@typingpractice.com</a> 聯繫我們。
          </p>
        </section>
        
        <section>
          <h2>政策變更</h2>
          <p>
            我們可能會不時更新本廣告政策。我們會在此頁面上發布任何更改，並在進行重大更改時通知您。
          </p>
        </section>
      </div>
    </div>
  );
};

export default AdDisclosure; 