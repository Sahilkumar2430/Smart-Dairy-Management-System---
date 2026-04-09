import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCattle = createAsyncThunk(
  'cattle/fetchCattle',
  async () => {
    const response = await api.get('/cattle');
    return response.data;
  }
);

export const addCattle = createAsyncThunk(
  'cattle/addCattle',
  async (cattleData) => {
    const response = await api.post('/cattle', cattleData);
    return response.data;
  }
);

export const updateCattle = createAsyncThunk(
  'cattle/updateCattle',
  async ({ id, data }) => {
    const response = await api.put(`/cattle/${id}`, data);
    return response.data;
  }
);

export const deleteCattle = createAsyncThunk(
  'cattle/deleteCattle',
  async (id) => {
    await api.delete(`/cattle/${id}`);
    return id;
  }
);

const cattleSlice = createSlice({
  name: 'cattle',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filters: {
      breed: '',
      healthStatus: '',
      gender: '',
    },
    stats: {
      total: 0,
      milking: 0,
      underTreatment: 0,
      averageMilk: 0,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        breed: '',
        healthStatus: '',
        gender: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCattle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCattle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        // Calculate stats
        state.stats.total = action.payload.length;
        state.stats.milking = action.payload.filter(c => c.gender === 'Female' && c.status === 'Active').length;
        state.stats.underTreatment = action.payload.filter(c => c.healthStatus === 'Under Treatment').length;
        // Calculate average milk production
        const milkingCows = action.payload.filter(c => c.milkProduction);
        if (milkingCows.length > 0) {
          const totalMilk = milkingCows.reduce((sum, cow) => sum + parseFloat(cow.milkProduction), 0);
          state.stats.averageMilk = (totalMilk / milkingCows.length).toFixed(1);
        }
      })
      .addCase(fetchCattle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCattle.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCattle.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCattle.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters } = cattleSlice.actions;
export default cattleSlice.reducer;