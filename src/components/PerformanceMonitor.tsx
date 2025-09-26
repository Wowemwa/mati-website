import { memo, useEffect, useState } from 'react'
import { initPerformanceMonitoring, logMemoryUsage } from '../utils/performance'

interface PerformanceStats {
  renderTime: number
  memoryUsage?: {
    used: number
    total: number
    limit: number
  }
}

const PerformanceMonitor = memo(function PerformanceMonitor() {
  const [stats, setStats] = useState<PerformanceStats | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring()

    // Only show in development mode
    if (import.meta.env.DEV) {
      const startTime = performance.now()

      // Measure initial render time
      const measureRenderTime = () => {
        const endTime = performance.now()
        const renderTime = endTime - startTime

        // Get memory usage if available
        let memoryUsage
        if ('memory' in performance) {
          const memory = (performance as any).memory
          memoryUsage = {
            used: Math.round(memory.usedJSHeapSize / 1048576),
            total: Math.round(memory.totalJSHeapSize / 1048576),
            limit: Math.round(memory.jsHeapSizeLimit / 1048576)
          }
        }

        setStats({
          renderTime,
          memoryUsage
        })
      }

      // Measure render time after initial render
      const timeoutId = setTimeout(measureRenderTime, 100)

      // Update memory usage periodically
      const intervalId = setInterval(() => {
        if ('memory' in performance) {
          const memory = (performance as any).memory
          setStats(prev => prev ? {
            ...prev,
            memoryUsage: {
              used: Math.round(memory.usedJSHeapSize / 1048576),
              total: Math.round(memory.totalJSHeapSize / 1048576),
              limit: Math.round(memory.jsHeapSizeLimit / 1048576)
            }
          } : null)
        }
      }, 5000)

      return () => {
        clearTimeout(timeoutId)
        clearInterval(intervalId)
      }
    }
  }, [])

  // Keyboard shortcut to toggle performance monitor (Ctrl+Shift+P)
  useEffect(() => {
    if (import.meta.env.DEV) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
          e.preventDefault()
          setIsVisible(prev => !prev)
          if (!isVisible) {
            logMemoryUsage()
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isVisible])

  // Don't render in production
  if (!import.meta.env.DEV || !isVisible || !stats) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur text-white text-xs p-3 rounded-lg font-mono shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">⚡ Performance</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div>
          Render: <span className="text-green-400">{stats.renderTime.toFixed(2)}ms</span>
        </div>
        
        {stats.memoryUsage && (
          <div>
            Memory: <span className="text-blue-400">{stats.memoryUsage.used}MB</span>
            <span className="text-gray-400"> / {stats.memoryUsage.total}MB</span>
          </div>
        )}
        
        <div className="text-gray-400 text-[10px] mt-2">
          Press Ctrl+Shift+P to toggle
        </div>
      </div>
    </div>
  )
})

export default PerformanceMonitor