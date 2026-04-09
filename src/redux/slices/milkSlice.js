import { createSlice } from '@reduxjs/toolkit';

const milkSlice = createSlice({
  name: 'milk',
  initialState: {
    records: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add reducers here
  },
});

export default milkSlice.reducer;