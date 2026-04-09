import React, { useState, useEffect } from 'react';
import {
  Alert,
  Snackbar,
  Box,
  Typography,
  Button,
  Paper,
  Slide,
  Grow,
} from '@mui/material';
import {
  WifiOff,
  Wifi,
  Refresh,
  SignalCellularConnectedNoInternet0Bar,
  CloudOff,
  CloudQueue,
} from '@mui/icons-material';
import { getOnlineStatus } from '../utils/networkUtils';

function OfflineAlert() {
  const [offline, setOffline] = useState(!getOnlineStatus());
  const [showBanner, setShowBanner] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      setShowBanner(true);
      setReconnecting(false);
      // Auto-hide banner after 5 seconds
      setTimeout(() => setShowBanner(false), 5000);
    };

    const handleOffline = () => {
      setOffline(true);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection status periodically
    const interval = setInterval(() => {
      const isOnline = getOnlineStatus();
      if (isOnline !== !offline) {
        setOffline(!isOnline);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [offline]);

  const handleReconnect = () => {
    setReconnecting(true);
    // Simulate reconnection attempt
    setTimeout(() => {
      if (navigator.onLine) {
        setOffline(false);
        setReconnecting(false);
      } else {
        setReconnecting(false);
      }
    }, 2000);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  return (
    <>
      {/* Top banner for connection status */}
      <Slide direction="down" in={showBanner} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            borderRadius: 0,
            bgcolor: offline ? 'error.main' : 'success.main',
            color: 'white',
            p: 1,
          }}
          elevation={4}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            {offline ? (
              <>
                <CloudOff sx={{ mr: 1 }} />
                <Typography variant="body2">
                  You are currently offline. Some features may be limited.
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="inherit"
                  sx={{ ml: 2, bgcolor: 'white', color: offline ? 'error.main' : 'success.main' }}
                  startIcon={<Refresh />}
                  onClick={handleReconnect}
                  disabled={reconnecting}
                >
                  {reconnecting ? 'Reconnecting...' : 'Reconnect'}
                </Button>
              </>
            ) : (
              <>
                <Wifi sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Connection restored! You're back online.
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="inherit"
                  sx={{ ml: 2, bgcolor: 'white', color: 'success.main' }}
                  onClick={handleClose}
                >
                  Dismiss
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Slide>

      {/* Snackbar for offline notifications */}
      <Snackbar
        open={offline}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Grow in={offline}>
          <Alert
            severity="warning"
            icon={<SignalCellularConnectedNoInternet0Bar />}
            sx={{
              width: '100%',
              bgcolor: 'warning.dark',
              color: 'warning.contrastText',
              '& .MuiAlert-icon': {
                color: 'warning.contrastText',
              },
            }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleReconnect}
                disabled={reconnecting}
              >
                {reconnecting ? '...' : 'Retry'}
              </Button>
            }
          >
            <Typography variant="body2">
              No internet connection. Working in offline mode.
            </Typography>
          </Alert>
        </Grow>
      </Snackbar>

      {/* Offline indicator badge (floating) */}
      {offline && !showBanner && (
        <Slide direction="up" in={offline}>
          <Paper
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 9998,
              bgcolor: 'warning.main',
              color: 'white',
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              boxShadow: 3,
              cursor: 'pointer',
            }}
            onClick={() => setShowBanner(true)}
          >
            <WifiOff sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="caption">Offline</Typography>
          </Paper>
        </Slide>
      )}
    </>
  );
}

export default OfflineAlert;