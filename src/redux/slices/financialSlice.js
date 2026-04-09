import { createSlice } from '@reduxjs/toolkit';

const financialSlice = createSlice({
  name: 'financial',
  initialState: {
    transactions: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add reducers here
  },
});

export default financialSlice.reducer;