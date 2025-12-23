export const useNetworkStatus = () => {
  const isOnline = ref(true)
  const isSlowConnection = ref(false)
  const connectionType = ref<string>('unknown')

  const checkConnection = () => {
    isOnline.value = navigator.onLine

    // Check connection type and speed
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection

    if (connection) {
      connectionType.value = connection.effectiveType || 'unknown'
      
      // Only consider 'slow-2g' as truly slow (removed '2g')
      // Many good connections are misclassified as '2g'
      isSlowConnection.value = connection.effectiveType === 'slow-2g'
    }
  }

  const testNetworkSpeed = async () => {
    if (!navigator.onLine) {
      isOnline.value = false
      return
    }

    try {
      const startTime = performance.now()
      const response = await fetch('/favicon.ico?_=' + Date.now(), { 
        method: 'HEAD',
        cache: 'no-cache'
      })
      const endTime = performance.now()
      const duration = endTime - startTime

      // Increased threshold to 5 seconds to reduce false positives
      // Also only set to true, never false here - let checkConnection handle that
      if (duration > 5000) {
        isSlowConnection.value = true
      } else if (duration < 2000) {
        // If fast enough, clear the slow connection flag
        isSlowConnection.value = false
      }
      // If between 2-5 seconds, maintain current state

      isOnline.value = response.ok
    } catch (error) {
      isOnline.value = false
    }
  }

  onMounted(() => {
    checkConnection()

    // Listen for online/offline events
    window.addEventListener('online', () => {
      checkConnection()
      // Reset slow connection when coming back online
      isSlowConnection.value = false
    })
    window.addEventListener('offline', checkConnection)

    // Listen for connection changes
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection

    if (connection) {
      connection.addEventListener('change', checkConnection)
    }

    // Increased interval to 60 seconds to reduce false positives
    const speedTestInterval = setInterval(testNetworkSpeed, 60000)

    onUnmounted(() => {
      window.removeEventListener('online', checkConnection)
      window.removeEventListener('offline', checkConnection)
      
      if (connection) {
        connection.removeEventListener('change', checkConnection)
      }
      
      clearInterval(speedTestInterval)
    })
  })

  return {
    isOnline: readonly(isOnline),
    isSlowConnection: readonly(isSlowConnection),
    connectionType: readonly(connectionType),
    checkConnection,
    testNetworkSpeed
  }
}