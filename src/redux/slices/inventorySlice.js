import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    loading: false,
    error: null,
    stats: {
      totalItems: 0,
      lowStock: 0,
      totalValue: 0,
    },
  },
  reducers: {
    setInventoryItems: (state, action) => {
      state.items = action.payload;
      // Calculate stats
      state.stats.totalItems = action.payload.length;
      state.stats.lowStock = action.payload.filter(item => item.quantity <= item.reorderLevel).length;
      state.stats.totalValue = action.payload.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    },
    addInventoryItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateInventoryItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteInventoryItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setInventoryItems, 
  addInventoryItem, 
  updateInventoryItem, 
  deleteInventoryItem,
  setLoading,
  setError,
} = inventorySlice.actions;

export default inventorySlice.reducer;