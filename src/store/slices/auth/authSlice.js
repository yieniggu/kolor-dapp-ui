import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checking: true,
  uid: null,
  name: null,
  role: null,
  address: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.checking = false;
      state.uid = payload.uid;
      state.name = payload.name;
      state.role = payload.role;
      state.address = payload.address;
    },
    setChecking: (state, { payload }) => {
      state.checking = payload;
    },
    logout: () => initialState,
  },
});

export const { login, setChecking, logout } = authSlice.actions;
