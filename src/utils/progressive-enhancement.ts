/**
 * Progressive Enhancement and Advanced Optimization Strategies
 */

// Service Worker registration for offline support
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })
      
      console.log('✅ Service Worker registered:', registration.scope)
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, refresh the page
              if (confirm('New version available! Reload to update?')) {
                window.location.reload()
              }
            }
          })
        }
      })
      
      return registration
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  }
}

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  // This would typically be done at build time, but we can optimize loading
  const criticalStyles = `
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: system-ui, sans-serif; }
    .min-h-screen { min-height: 100vh; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `
  
  const styleElement = document.createElement('style')
  styleElement.textContent = criticalStyles
  document.head.appendChild(styleElement)
}

// Image lazy loading with Intersection Observer
export const createLazyImageObserver = () => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers - load all images
    return null
  }
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.dataset.src
        
        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      }
    })
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  })
  
  return imageObserver
}

// Prefetch critical routes
export const prefetchCriticalRoutes = () => {
  const criticalRoutes = ['/gis', '/biodiversity', '/species']
  
  criticalRoutes.forEach(route => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = route
    document.head.appendChild(link)
  })
}

// Native performance monitoring using built-in browser APIs
export const initWebVitalsMonitoring = () => {
  if (import.meta.env.DEV) {
    console.log('📊 Initializing Performance Monitoring...')
    
    // Monitor basic performance metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        console.group('📊 Performance Metrics')
        console.log('⏱️  Load Time:', (perfData.loadEventEnd - perfData.fetchStart).toFixed(2) + 'ms')
        console.log('🏗️  DOM Ready:', (perfData.domContentLoadedEventEnd - perfData.fetchStart).toFixed(2) + 'ms')
        console.log('🎨 First Paint:', (perfData.responseStart - perfData.fetchStart).toFixed(2) + 'ms')
        
        // Log paint metrics if available
        const paintMetrics = performance.getEntriesByType('paint')
        paintMetrics.forEach(metric => {
          console.log(`🎨 ${metric.name}:`, metric.startTime.toFixed(2) + 'ms')
        })
        
        console.groupEnd()
      }, 0)
    })
    
    // Monitor resource loading performance
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) { // Slow resource > 1s
          console.warn(`� Slow resource:`, entry.name, `${entry.duration.toFixed(2)}ms`)
        }
      }
    })
    
    try {
      resourceObserver.observe({ entryTypes: ['resource'] })
    } catch (e) {
      // Not supported in all browsers
    }
  }
}

// Resource hints optimization
export const optimizeResourceHints = () => {
  // Preload critical fonts
  const fontPreload = document.createElement('link')
  fontPreload.rel = 'preload'
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  fontPreload.as = 'style'
  document.head.appendChild(fontPreload)
  
  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    'https://unpkg.com',
    'https://cdn.jsdelivr.net'
  ]
  
  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    document.head.appendChild(link)
  })
}

// Adaptive loading based on network conditions
export const adaptiveLoading = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    
    // Reduce quality on slow connections
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      document.documentElement.classList.add('slow-connection')
      console.log('🐌 Slow connection detected - reducing resource quality')
    }
    
    // Enable data saver mode if requested
    if (connection.saveData) {
      document.documentElement.classList.add('save-data')
      console.log('💾 Data saver mode enabled')
    }
  }
}

// Initialize all progressive enhancements
export const initProgressiveEnhancement = () => {
  // Run immediately
  inlineCriticalCSS()
  optimizeResourceHints()
  adaptiveLoading()
  
  // Run after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    prefetchCriticalRoutes()
    createLazyImageObserver()
  })
  
  // Run after page load
  window.addEventListener('load', () => {
    registerServiceWorker()
    initWebVitalsMonitoring()
  })
}