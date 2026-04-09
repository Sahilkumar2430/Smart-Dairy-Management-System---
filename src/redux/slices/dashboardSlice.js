import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
);

export const fetchDashboardCharts = createAsyncThunk(
  'dashboard/fetchCharts',
  async () => {
    const response = await api.get('/dashboard/charts');
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      totalCattle: 0,
      milkProduction: 0,
      healthAlerts: 0,
      feedStock: 0,
      pendingTasks: 0,
      monthlyRevenue: 0,
    },
    charts: {
      milkProduction: [],
      cattleHealth: [],
    },
    recentActivities: [],
    upcomingTasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    setRecentActivities: (state, action) => {
      state.recentActivities = action.payload;
    },
    setUpcomingTasks: (state, action) => {
      state.upcomingTasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDashboardCharts.fulfilled, (state, action) => {
        state.charts = action.payload;
      });
  },
});

export const { setRecentActivities, setUpcomingTasks } = dashboardSlice.actions;
export default dashboardSlice.reducer;