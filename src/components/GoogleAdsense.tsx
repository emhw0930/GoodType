import React, { useEffect } from 'react';

const GoogleAdsense: React.FC = () => {
  useEffect(() => {
    try {
      // 如果 AdSense 腳本已經存在，則不重新加載
      if (!(window as any).adsbygoogle) {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5109950689119744';
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // 通知 AdSense 頁面已更改
      if ((window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading AdSense:', error);
    }
  }, []);

  return null;
};

export default GoogleAdsense; 