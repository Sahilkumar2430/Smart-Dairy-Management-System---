import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setInventoryItems: (state, action) => {
      state.items = action.payload;
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
  },
});

export const { setInventoryItems, addInventoryItem, updateInventoryItem, deleteInventoryItem } = inventorySlice.actions;
export default inventorySlice.reducer;