import { configureStore } from '@reduxjs/toolkit';
import cattleReducer from './slices/cattleSlice';
import healthReducer from './slices/healthSlice';
import milkReducer from './slices/milkSlice';
import inventoryReducer from './slices/inventorySlice';
import financialReducer from './slices/financialSlice';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    cattle: cattleReducer,
    health: healthReducer,
    milk: milkReducer,
    inventory: inventoryReducer,
    financial: financialReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    tasks: taskReducer,
  },
});