import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isTablet: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    isTablet: false,
    userAgent: '',
    screenWidth: 0,
    screenHeight: 0,
  });

  const [forceMobileView, setForceMobileView] = useState<boolean | null>(null);

  useEffect(() => {
    const updateDeviceInfo = () => {
      const userAgent = navigator.userAgent || '';
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Detect mobile platforms
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      const isTablet = /iPad/.test(userAgent) || 
        (isAndroid && !/Mobile/.test(userAgent)) ||
        (screenWidth >= 768 && screenWidth <= 1024);
      
      // More comprehensive mobile detection
      const isMobileDevice = isIOS || isAndroid || 
        /webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
        screenWidth <= 768;

      setDeviceInfo({
        isMobile: isMobileDevice,
        isIOS,
        isAndroid,
        isTablet,
        userAgent,
        screenWidth,
        screenHeight,
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  // Determine the actual view mode
  const isMobileView = forceMobileView !== null ? forceMobileView : deviceInfo.isMobile;

  const toggleMobileView = () => {
    setForceMobileView(prev => prev === null ? !deviceInfo.isMobile : !prev);
  };

  const resetToAutoDetect = () => {
    setForceMobileView(null);
  };

  return {
    deviceInfo,
    isMobileView,
    forceMobileView,
    toggleMobileView,
    resetToAutoDetect,
    isAutoDetected: forceMobileView === null,
  };
};