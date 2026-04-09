import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await api.get('/tasks');
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await api.delete(`/tasks/${id}`);
    return id;
  }
);

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateStatus',
  async ({ id, status }) => {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      status: 'all',
      priority: 'all',
      category: 'all',
    },
    stats: {
      total: 0,
      completed: 0,
      pending: 0,
      overdue: 0,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        priority: 'all',
        category: 'all',
      };
    },
    calculateStats: (state) => {
      const now = new Date();
      state.stats.total = state.items.length;
      state.stats.completed = state.items.filter(t => t.status === 'completed').length;
      state.stats.pending = state.items.filter(t => t.status !== 'completed').length;
      state.stats.overdue = state.items.filter(t => 
        t.status !== 'completed' && new Date(t.dueDate) < now
      ).length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        // Calculate stats
        const now = new Date();
        state.stats.total = action.payload.length;
        state.stats.completed = action.payload.filter(t => t.status === 'completed').length;
        state.stats.pending = action.payload.filter(t => t.status !== 'completed').length;
        state.stats.overdue = action.payload.filter(t => 
          t.status !== 'completed' && new Date(t.dueDate) < now
        ).length;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
        // Recalculate stats
        const now = new Date();
        state.stats.total = state.items.length;
        state.stats.completed = state.items.filter(t => t.status === 'completed').length;
        state.stats.pending = state.items.filter(t => t.status !== 'completed').length;
        state.stats.overdue = state.items.filter(t => 
          t.status !== 'completed' && new Date(t.dueDate) < now
        ).length;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
        // Recalculate stats
        const now = new Date();
        state.stats.total = state.items.length;
        state.stats.completed = state.items.filter(t => t.status === 'completed').length;
        state.stats.pending = state.items.filter(t => t.status !== 'completed').length;
        state.stats.overdue = state.items.filter(t => 
          t.status !== 'completed' && new Date(t.dueDate) < now
        ).length;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setFilters, clearFilters, calculateStats } = taskSlice.actions;
export default taskSlice.reducer;