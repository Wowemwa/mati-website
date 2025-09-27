import React from 'react';
import { useDeviceDetection } from '../context/DeviceContext';

interface ViewToggleButtonProps {
  className?: string;
}

export const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({ className = '' }) => {
  const { deviceInfo, isMobileView, toggleMobileView, isAutoDetected } = useDeviceDetection();

  const getButtonIcon = () => {
    if (isMobileView) {
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 18h.01M8 21h8a1 1 0 001-1v-5.5a1 1 0 00-1-1H8a1 1 0 00-1 1V20a1 1 0 001 1zM8 4h8a1 1 0 011 1v4a1 1 0 01-1 1H8a1 1 0 01-1-1V5a1 1 0 011-1z" />
      </svg>
    );
  };

  const getButtonText = () => {
    if (isMobileView) {
      return 'Desktop View';
    }
    return 'Mobile View';
  };

  const getStatusBadge = () => {
    if (isAutoDetected) {
      return (
        <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-500/30">
          Auto
        </span>
      );
    }
    return (
      <span className="ml-2 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">
        Manual
      </span>
    );
  };

  const getPlatformInfo = () => {
    const platforms = [];
    if (deviceInfo.isIOS) platforms.push('iOS');
    if (deviceInfo.isAndroid) platforms.push('Android');
    if (deviceInfo.isTablet) platforms.push('Tablet');
    
    return platforms.length > 0 ? platforms.join(', ') : 'Desktop';
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Main Toggle Button */}
      <button
        onClick={toggleMobileView}
        className="group flex items-center bg-black/20 backdrop-blur-xl border border-white/10 
                   text-white px-4 py-3 rounded-full shadow-2xl hover:bg-black/30 
                   transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20"
        title={`Switch to ${isMobileView ? 'Desktop' : 'Mobile'} View`}
      >
        {getButtonIcon()}
        <span className="font-medium text-sm">{getButtonText()}</span>
        {getStatusBadge()}
        
        {/* Hover Info */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg 
                          px-3 py-2 text-xs text-white shadow-xl min-w-max">
            <div className="flex flex-col space-y-1">
              <div><span className="text-gray-400">Platform:</span> {getPlatformInfo()}</div>
              <div><span className="text-gray-400">Screen:</span> {deviceInfo.screenWidth}×{deviceInfo.screenHeight}</div>
              <div><span className="text-gray-400">Current:</span> {isMobileView ? 'Mobile' : 'Desktop'} View</div>
            </div>
            {/* Arrow */}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 
                            border-transparent border-t-black/90"></div>
          </div>
        </div>
      </button>

      {/* Device Info Badge (Optional - can be hidden on production) */}
      {import.meta.env.DEV && (
        <div className="mt-2 bg-black/20 backdrop-blur-xl border border-white/10 
                        rounded-lg px-3 py-2 text-xs text-white/70">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${deviceInfo.isMobile ? 'bg-green-400' : 'bg-blue-400'}`}></div>
            <span>{deviceInfo.isMobile ? 'Mobile Device' : 'Desktop Device'}</span>
          </div>
        </div>
      )}
    </div>
  );
};