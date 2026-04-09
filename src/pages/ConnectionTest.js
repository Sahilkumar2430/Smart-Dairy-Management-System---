import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  IconButton,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Warning,
  CloudDone,
  CloudOff,
  Storage,
  Send,
  Refresh,
  ExpandMore,
  Close,
  Visibility,
  Delete,
} from '@mui/icons-material';
import api from '../services/api';

function ConnectionTest() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [mongoStatus, setMongoStatus] = useState('checking');
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    testName: '',
    testValue: '',
  });
  const [savedItems, setSavedItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Test 1: Check Backend Connection
  useEffect(() => {
    checkBackendConnection();
    checkMongoDBStatus();
    fetchTestData();
    fetchSavedItems();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const response = await api.get('/health');
      setBackendStatus('connected');
      console.log('✅ Backend connected:', response.data);
      showSnackbar('✅ Backend connected successfully!', 'success');
    } catch (error) {
      setBackendStatus('disconnected');
      console.error('❌ Backend connection failed:', error);
      showSnackbar('❌ Backend connection failed!', 'error');
    }
  };

  const checkMongoDBStatus = async () => {
    try {
      const response = await api.get('/health');
      if (response.data.mongodb === 'connected') {
        setMongoStatus('connected');
      } else {
        setMongoStatus('disconnected');
      }
    } catch (error) {
      setMongoStatus('unknown');
    }
  };

  const fetchTestData = async () => {
    setLoading(true);
    try {
      const endpoints = [
        '/cattle',
        '/health',
        '/breeding',
        '/milk',
        '/inventory',
        '/financial',
        '/tasks',
        '/users'
      ];
      
      const results = [];
      for (const endpoint of endpoints) {
        try {
          const response = await api.get(endpoint);
          results.push({
            endpoint,
            status: 'success',
            count: response.data.results || response.data.data?.length || 0,
            data: response.data
          });
        } catch (error) {
          results.push({
            endpoint,
            status: error.response?.status || 'error',
            message: error.message
          });
        }
      }
      setTestData(results);
    } catch (error) {
      console.error('Error fetching test data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedItems = async () => {
    try {
      // Try to fetch from multiple endpoints to see what's in the database
      const cattle = await api.get('/cattle').catch(() => ({ data: { data: [] } }));
      const health = await api.get('/health').catch(() => ({ data: { data: [] } }));
      const tasks = await api.get('/tasks').catch(() => ({ data: { data: [] } }));
      
      const items = [];
      
      if (cattle.data.data?.cattle) {
        items.push(...cattle.data.data.cattle.map(c => ({ ...c, type: 'cattle' })));
      }
      if (health.data.data?.records) {
        items.push(...health.data.data.records.map(r => ({ ...r, type: 'health' })));
      }
      if (tasks.data.data?.tasks) {
        items.push(...tasks.data.data.tasks.map(t => ({ ...t, type: 'task' })));
      }
      
      setSavedItems(items);
    } catch (error) {
      console.error('Error fetching saved items:', error);
    }
  };

  const handleSaveTest = async () => {
    if (!formData.testName || !formData.testValue) {
      setResult({
        type: 'error',
        message: 'Please fill in both fields'
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Try to save to different collections based on input
      const testData = {
        tagId: `TEST-${Date.now()}`,
        name: formData.testName,
        breed: 'Test Breed',
        gender: 'Female',
        birthDate: new Date(),
        weight: 500,
        notes: formData.testValue,
        description: formData.testValue,
        title: formData.testName
      };

      let response;
      
      // Try saving to cattle collection first
      try {
        response = await api.post('/cattle', testData);
        showSnackbar('✅ Data saved to Cattle collection!', 'success');
      } catch (cattleError) {
        // If cattle fails, try health records
        try {
          response = await api.post('/health', {
            cattleId: 'test-id',
            recordType: 'Test',
            description: formData.testValue,
            date: new Date(),
            administeredBy: 'Test User'
          });
          showSnackbar('✅ Data saved to Health Records!', 'success');
        } catch (healthError) {
          // If health fails, try tasks
          response = await api.post('/tasks', {
            title: formData.testName,
            description: formData.testValue,
            category: 'Test',
            priority: 'Medium',
            dueDate: new Date()
          });
          showSnackbar('✅ Data saved to Tasks!', 'success');
        }
      }

      setResult({
        type: 'success',
        message: '✅ Data saved successfully to MongoDB!',
        data: response?.data
      });

      // Refresh the data
      fetchTestData();
      fetchSavedItems();
      
      // Clear form
      setFormData({ testName: '', testValue: '' });

    } catch (error) {
      console.error('Save error:', error);
      setResult({
        type: 'error',
        message: error.response?.data?.message || error.message,
        details: error.response?.data
      });
      showSnackbar('❌ Failed to save data!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id, type) => {
    try {
      await api.delete(`/${type}/${id}`);
      showSnackbar('✅ Item deleted successfully!', 'success');
      fetchSavedItems();
    } catch (error) {
      showSnackbar('❌ Failed to delete item!', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🔌 Frontend-Backend-MongoDB Connection Test
      </Typography>

      {/* Connection Status Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Backend Server (Port 5000)
                  </Typography>
                  <Typography variant="h6">
                    {backendStatus === 'checking' && <CircularProgress size={20} />}
                    {backendStatus === 'connected' && '✅ Connected'}
                    {backendStatus === 'disconnected' && '❌ Disconnected'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    http://localhost:5000
                  </Typography>
                </Box>
                {backendStatus === 'connected' ? (
                  <CloudDone sx={{ fontSize: 40, color: 'success.main' }} />
                ) : (
                  <CloudOff sx={{ fontSize: 40, color: 'error.main' }} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    MongoDB Connection
                  </Typography>
                  <Typography variant="h6">
                    {mongoStatus === 'checking' && <CircularProgress size={20} />}
                    {mongoStatus === 'connected' && '✅ Connected'}
                    {mongoStatus === 'disconnected' && '❌ Disconnected'}
                    {mongoStatus === 'unknown' && '❓ Unknown'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Database: smart-dairy
                  </Typography>
                </Box>
                <Storage sx={{ fontSize: 40, color: mongoStatus === 'connected' ? 'success.main' : 'error.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Frontend Server
                  </Typography>
                  <Typography variant="h6">
                    ✅ Running
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    http://localhost:3000
                  </Typography>
                </Box>
                <CloudDone sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Test Data Form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          📝 Test Data Saving
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Enter test data below to save directly to MongoDB. This will create a record in the database.
        </Typography>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Test Name / Title"
              value={formData.testName}
              onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
              placeholder="e.g., Test Cattle, Health Record"
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Test Value / Description"
              value={formData.testValue}
              onChange={(e) => setFormData({ ...formData, testValue: e.target.value })}
              placeholder="Description or value"
              multiline
              rows={1}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSaveTest}
              disabled={loading || backendStatus !== 'connected'}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ height: '56px' }}
            >
              {loading ? 'Saving...' : 'Save to MongoDB'}
            </Button>
          </Grid>
        </Grid>

        {result && (
          <Alert 
            severity={result.type} 
            sx={{ mt: 2 }}
            action={
              <IconButton size="small" onClick={() => setResult(null)}>
                <Close fontSize="small" />
              </IconButton>
            }
          >
            <Typography variant="body2">{result.message}</Typography>
            {result.details && (
              <pre style={{ margin: '5px 0 0', fontSize: '12px', overflow: 'auto' }}>
                {JSON.stringify(result.details, null, 2)}
              </pre>
            )}
          </Alert>
        )}
      </Paper>

      {/* API Endpoints Status */}
      <Accordion sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            📡 API Endpoints Status
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Endpoint</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Records Found</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <code>/api{item.endpoint}</code>
                    </TableCell>
                    <TableCell>
                      {item.status === 'success' ? (
                        <Chip label="Connected" color="success" size="small" />
                      ) : (
                        <Chip label={`Error ${item.status}`} color="error" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      {item.status === 'success' ? item.count : '-'}
                    </TableCell>
                    <TableCell>
                      {item.status === 'success' ? (
                        <Typography variant="caption">
                          {item.count} documents found
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="error">
                          {item.message}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button
              startIcon={<Refresh />}
              onClick={() => {
                fetchTestData();
                fetchSavedItems();
              }}
              size="small"
            >
              Refresh Data
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Saved Data Display */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            💾 Data in MongoDB ({savedItems.length} items)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {savedItems.length > 0 ? (
            <List>
              {savedItems.map((item, index) => (
                <ListItem
                  key={index}
                  divider
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={() => handleDeleteItem(item._id, item.type)}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip 
                          label={item.type} 
                          size="small"
                          color={item.type === 'cattle' ? 'success' : item.type === 'health' ? 'error' : 'info'}
                        />
                        <Typography variant="body2">
                          {item.name || item.title || item.tagId || 'Unnamed'}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" display="block" color="text.secondary">
                          ID: {item._id}
                        </Typography>
                        <Typography variant="caption" display="block">
                          {item.notes || item.description || item.value || 'No description'}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                          Created: {new Date(item.createdAt || item.date || Date.now()).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Alert severity="info">
              No data found in MongoDB. Use the form above to save some test data!
            </Alert>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Quick Test Instructions */}
      <Paper sx={{ p: 2, mt: 3, bgcolor: 'info.light' }}>
        <Typography variant="subtitle2" gutterBottom color="white">
          🚀 Quick Test Steps:
        </Typography>
        <Typography variant="body2" color="white" component="div">
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>Check if all status cards show ✅ Connected</li>
            <li>Enter a test name and description in the form above</li>
            <li>Click "Save to MongoDB"</li>
            <li>Check if new item appears in "Data in MongoDB" section</li>
            <li>Verify in MongoDB Compass or shell: <code>db.cattles.find()</code></li>
          </ol>
        </Typography>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ConnectionTest;