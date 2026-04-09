// Check if browser is online
export const getOnlineStatus = () => {
  return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
};

// Check internet connection by making a request
export const checkInternetConnection = async (timeout = 5000) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch('https://www.google.com', {
      mode: 'no-cors',
      cache: 'no-cache',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    return false;
  }
};

// Get connection type
export const getConnectionType = () => {
  if (!navigator) return 'unknown';
  
  const connection = navigator.connection || 
                     navigator.mozConnection || 
                     navigator.webkitConnection;
  
  if (connection) {
    return {
      type: connection.effectiveType || 'unknown',
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }
  
  return { type: 'unknown' };
};

// Listen for connection changes
export const onConnectionChange = (callback) => {
  if (!navigator) return () => {};

  const handleOnline = () => callback({ online: true });
  const handleOffline = () => callback({ online: false });

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};