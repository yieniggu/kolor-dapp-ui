import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectionError: {
    error: false,
    errorType: null,
  },
  connected: false,
  connector: null,
  account: null,
  provider: null,
  connectionLoading: false,
  success: false,
  marketplaceAllowance: 0,
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    connect: (state, { payload }) => {
      state.connected = true;
      state.account = payload.account;
      state.connector = payload.connector;
    },
    checkingConnection: (state, { payload }) => {
      state.loading = payload.loading;
      state.provider = payload.provider;
    },
    connectionErrorDetected: (state, { payload }) => {
      state.connectionError.error = true;
      state.connectionError.errorMessage = payload.errorMessage;
    },
    connectionErrorCleanup: (state) => {
      state.connectionError.error = false;
      state.connectionError.errorMessage = null;
    },
    setConnectionLoading: (state, { payload }) => {
      state.connectionLoading = payload;
    },
    setSuccess: (state, { payload }) => {
      state.success = payload;
    },
    setMarketplaceAllowance: (state, { payload }) => {
      state.marketplaceAllowance = payload;
    },
    setConnector: (state, { payload }) => {
      state.connector = payload;
    },
    reset: () => initialState,
  },
});

export const {
  connect,
  checkingConnection,
  connectionErrorDetected,
  connectionErrorCleanup,
  setConnectionLoading,
  setSuccess,
  setMarketplaceAllowance,
  setConnector,
  reset,
} = connectionSlice.actions;
