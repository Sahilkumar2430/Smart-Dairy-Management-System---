import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';// In your App.js, add this route


// Layout Components
import Layout from './components/common/Layout';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CattleManagement from './pages/CattleManagement';
import HealthRecords from './pages/HealthRecords';
import BreedingManagement from './pages/BreedingManagement';
import MilkProduction from './pages/MilkProduction';
import FeedInventory from './pages/FeedInventory';
import FinancialManagement from './pages/FinancialManagement';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Tasks from './pages/Tasks'; // Add this import
import Activities from './pages/Activities'; // You can create this similarly
import ConnectionTest from './pages/ConnectionTest'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Agricultural green
    },
    secondary: {
      main: '#FFB74D', // Warm orange
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/test-connection" element={<ConnectionTest />} />

            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cattle" element={<CattleManagement />} />
              <Route path="health" element={<HealthRecords />} />
              <Route path="breeding" element={<BreedingManagement />} />
              <Route path="milk-production" element={<MilkProduction />} />
              <Route path="inventory" element={<FeedInventory />} />
              <Route path="financial" element={<FinancialManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="tasks" element={<Tasks />} /> {/* Add this route */}
              <Route path="activities" element={<Activities />} /> {/* Add this if you create Activities page */}
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
// Add to your routes

export default App;