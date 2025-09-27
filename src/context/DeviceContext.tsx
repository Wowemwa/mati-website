import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDeviceOptimizations, performanceUtils } from '../config/performance';

export interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isTablet: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

interface DeviceContextType {
  deviceInfo: DeviceInfo;
  isMobileView: boolean;
  optimizations: any;
  prefersReducedMotion: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    isTablet: false,
    userAgent: '',
    screenWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const userAgent = navigator.userAgent || '';
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Enhanced mobile platform detection
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      
      // Better tablet detection
      const isTablet = /iPad/.test(userAgent) || 
        (isAndroid && !/Mobile/.test(userAgent)) ||
        (screenWidth >= 768 && screenWidth <= 1280 && 
         (screenHeight / screenWidth < 1.5 || screenWidth / screenHeight < 1.5));
      
      // Comprehensive mobile detection with better breakpoints
      const isMobileDevice = isIOS || isAndroid || 
        /webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
        screenWidth <= 768 ||
        (screenWidth <= 1024 && 'ontouchstart' in window);

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

  // Use only automatic detection
  const isMobileView = deviceInfo.isMobile;
  
  // Get device-specific optimizations
  const optimizations = getDeviceOptimizations(deviceInfo);
  const prefersReducedMotion = performanceUtils.prefersReducedMotion();

  const value: DeviceContextType = {
    deviceInfo,
    isMobileView,
    optimizations,
    prefersReducedMotion,
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceDetection = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDeviceDetection must be used within a DeviceProvider');
  }
  return context;
};