import React, { useEffect } from 'react';

interface GoogleAdsenseProps {
  shouldLoadAds?: boolean;
}

const GoogleAdsense: React.FC<GoogleAdsenseProps> = ({ shouldLoadAds = true }) => {
  useEffect(() => {
    // Only load script if explicitly allowed
    if (!shouldLoadAds) {
      return;
    }

    try {
      // Check if AdSense script already exists
      if (!(window as any).adsbygoogle) {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5109950689119744';
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    } catch (error) {
      console.error('Error loading AdSense script:', error);
    }
  }, [shouldLoadAds]);

  return null;
};

export default GoogleAdsense; 