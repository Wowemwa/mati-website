// Performance optimization configurations for mobile and desktop
export const PERFORMANCE_CONFIG = {
  // Animation settings
  animations: {
    mobile: {
      duration: 200,
      easing: 'ease-out',
      reducedMotion: true,
    },
    desktop: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      reducedMotion: false,
    },
  },
  
  // Touch targets (minimum 44px for iOS, 48px for Android)
  touchTargets: {
    ios: {
      minHeight: '44px',
      minWidth: '44px',
      padding: '12px',
    },
    android: {
      minHeight: '48px',
      minWidth: '48px',
      padding: '16px',
    },
    desktop: {
      minHeight: '40px',
      minWidth: '40px',
      padding: '8px 16px',
    },
  },
  
  // Breakpoints optimized for common devices
  breakpoints: {
    mobile: '320px',
    mobileLarge: '414px',
    tablet: '768px',
    tabletLarge: '1024px',
    desktop: '1280px',
    desktopLarge: '1440px',
    desktopXL: '1920px',
  },
  
  // Image optimization
  images: {
    mobile: {
      quality: 75,
      format: 'webp',
      sizes: [320, 414, 768],
    },
    desktop: {
      quality: 85,
      format: 'webp',
      sizes: [768, 1024, 1280, 1920],
    },
  },
  
  // Debounce and throttle timings
  timings: {
    scrollThrottle: 16, // 60fps
    resizeDebounce: 150,
    searchDebounce: 300,
    animationDebounce: 100,
  },
  
  // Memory management
  memory: {
    maxCachedComponents: 50,
    lazyLoadOffset: 100, // pixels
    virtualScrollThreshold: 1000, // items
  },
};

// Device-specific optimizations
export const getDeviceOptimizations = (deviceInfo: any) => {
  const { isMobile, isIOS, isAndroid, isTablet, screenWidth } = deviceInfo;
  
  return {
    // Scroll behavior
    scrollBehavior: isMobile ? 'auto' : 'smooth',
    
    // Touch action for better scroll performance
    touchAction: isMobile ? 'pan-y pinch-zoom' : 'auto',
    
    // Backdrop filter support
    backdropFilter: isIOS || (!isMobile && screenWidth > 1024),
    
    // Hardware acceleration
    willChange: isMobile ? 'transform' : 'transform, opacity',
    
    // Safe areas for iOS
    safeArea: isIOS ? {
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)',
    } : {},
    
    // Android-specific optimizations
    androidOptimizations: isAndroid ? {
      WebkitTapHighlightColor: 'transparent',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
    } : {},
    
    // Tablet-specific adjustments
    tabletOptimizations: isTablet ? {
      maxWidth: '100%',
      gridColumns: screenWidth > 1024 ? 3 : 2,
    } : {},
  };
};

// Performance monitoring utilities
export const performanceUtils = {
  // Measure component render time
  measureRender: (componentName: string, renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    console.log(`${componentName} render time: ${end - start}ms`);
  },
  
  // Check if reduced motion is preferred
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Memory usage monitoring
  getMemoryUsage: () => {
    if ('memory' in performance) {
      return {
        used: Math.round((performance as any).memory.usedJSHeapSize / 1048576),
        total: Math.round((performance as any).memory.totalJSHeapSize / 1048576),
        limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1048576),
      };
    }
    return null;
  },
  
  // Network connection monitoring
  getConnectionInfo: () => {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
      };
    }
    return null;
  },
};

export default PERFORMANCE_CONFIG;