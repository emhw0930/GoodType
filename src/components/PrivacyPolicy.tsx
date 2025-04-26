import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Policy.css';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="policy-container">
      <button className="back-button" onClick={() => navigate('/')}>
        返回主頁
      </button>
      
      <div className="policy-content">
        <h1>隱私政策</h1>
        <p className="last-updated">最後更新: 2024年4月15日</p>
        
        <section>
          <p>
            打字練習應用程序（"我們"，"我們的"或"本應用"）尊重並保護用戶的隱私。本隱私政策概述了我們如何收集、使用、披露和保護您的個人信息。
          </p>
        </section>
        
        <section>
          <h2>收集的信息</h2>
          <p>
            我們可能收集以下類型的信息：
          </p>
          <ul>
            <li>
              <strong>使用數據：</strong> 包括打字速度、準確率、練習時間和使用頻率等打字練習統計數據。
            </li>
            <li>
              <strong>設備信息：</strong> 包括設備類型、操作系統版本、唯一設備識別符等。
            </li>
            <li>
              <strong>日誌信息：</strong> 包括使用我們服務時的IP地址、瀏覽器類型、訪問時間和引用頁面地址等。
            </li>
            <li>
              <strong>位置信息：</strong> 僅限於您授權的基於IP地址的大致位置。
            </li>
          </ul>
        </section>
        
        <section>
          <h2>信息使用</h2>
          <p>
            我們使用收集的信息來：
          </p>
          <ul>
            <li>提供、維護和改進我們的服務</li>
            <li>個性化您的體驗並提供定制內容</li>
            <li>分析使用模式以優化應用性能</li>
            <li>提供客戶支持並響應您的請求</li>
            <li>發送服務通知和更新</li>
            <li>防止欺詐和濫用</li>
          </ul>
        </section>
        
        <section>
          <h2>信息共享</h2>
          <p>
            我們不會出售您的個人信息。我們可能在以下情況下共享您的信息：
          </p>
          <ul>
            <li>
              <strong>服務提供商：</strong> 與幫助我們提供和改進服務的第三方服務提供商共享，這些提供商有合同義務保護您的數據。
            </li>
            <li>
              <strong>分析合作夥伴：</strong> 與分析服務提供商共享匿名使用數據，以幫助我們了解應用的使用情況。
            </li>
            <li>
              <strong>法律要求：</strong> 當我們真誠地相信披露是法律要求的，或者保護我們的權利、安全或財產所必需的。
            </li>
            <li>
              <strong>商業轉讓：</strong> 在合併、收購或資產出售的情況下，我們可能會轉讓您的信息作為交易的一部分。
            </li>
          </ul>
          <p>
            在所有情況下，我們要求這些第三方同意保護您的隱私和信息安全。
          </p>
        </section>
        
        <section>
          <h2>數據安全</h2>
          <p>
            我們實施合理的安全措施來保護您的個人信息免受未授權訪問、披露、更改和銷毀。這些措施包括數據加密、安全存儲和訪問控制。
          </p>
          <p>
            然而，沒有互聯網傳輸或電子存儲方法是100%安全的。因此，雖然我們努力使用商業上可接受的方式保護您的個人信息，但我們不能保證其絕對安全。
          </p>
        </section>
        
        <section>
          <h2>數據保留</h2>
          <p>
            我們將保留您的數據，只要您的帳戶處於活動狀態或需要提供服務給您。如果您請求刪除您的帳戶，我們將在合理的時間內刪除您的個人數據，除非法律要求我們保留某些信息。
          </p>
        </section>
        
        <section>
          <h2>兒童隱私</h2>
          <p>
            我們的服務不面向13歲以下的兒童。我們不會故意收集13歲以下兒童的個人信息。如果我們了解到我們收集了兒童的個人信息，我們將採取步驟刪除這些信息。
          </p>
        </section>
        
        <section>
          <h2>您的權利</h2>
          <p>
            根據您所在的司法管轄區，您可能擁有以下權利：
          </p>
          <ul>
            <li>訪問我們持有的關於您的個人數據</li>
            <li>更正不準確的數據</li>
            <li>刪除您的個人數據</li>
            <li>限制或反對處理您的數據</li>
            <li>數據可攜性</li>
            <li>撤回同意（如適用）</li>
          </ul>
          <p>
            要行使這些權利，請通過本政策中提供的聯繫方式與我們聯繫。
          </p>
        </section>
        
        <section>
          <h2>Cookie和類似技術</h2>
          <p>
            我們的應用可能使用"cookie"和類似技術來收集信息並改善您的體驗。您可以通過瀏覽器設置控制cookie的使用，但這可能會影響某些功能的可用性。
          </p>
        </section>
        
        <section>
          <h2>第三方鏈接</h2>
          <p>
            我們的應用可能包含指向第三方網站或服務的鏈接。我們不對這些第三方的隱私做法負責，並鼓勵您在提供個人信息之前閱讀他們的隱私政策。
          </p>
        </section>
        
        <section>
          <h2>國際數據傳輸</h2>
          <p>
            您的信息可能被傳輸並存儲在您所在國家/地區以外的計算機上。我們將確保這些傳輸符合適用的數據保護法律。
          </p>
        </section>
        
        <section>
          <h2>政策變更</h2>
          <p>
            我們可能會不時更新本隱私政策。我們會在此頁面上發布任何更改，並在進行重大更改時通知您。我們鼓勵您定期查看本政策以獲取任何變更的信息。
          </p>
        </section>
        
        <section>
          <h2>聯繫我們</h2>
          <p>
            如果您對本隱私政策有任何疑問或擔憂，請通過以下方式聯繫我們：
          </p>
          <p>
            電子郵件：<a href="mailto:support@typingpractice.com">support@typingpractice.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 