import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkingInvestments: true,
  gettingBalances: true,
  buying: false,
  balances: null,
  investments: null,
  marketplaceAllowance: 0,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setCheckingInvestments: (state, { payload }) => {
      state.checkingInvestments = payload;
    },
    setGettingBalances: (state, { payload }) => {
      state.gettingBalances = payload;
    },
    setBuying: (state, { payload }) => {
      state.buying = payload;
    },
    setBalances: (state, { payload }) => {
      state.balances = payload;
    },
    setInvestments: (state, { payload }) => {
      state.investments = payload;
    },
    setMarketplaceAllowance: (state, { payload }) => {
      state.marketplaceAllowance = payload;
    },
    resetToken: () => initialState,
  },
});

export const {
  setBalances,
  setGettingBalances,
  setBuying,
  setCheckingInvestments,
  setInvestments,
  setMarketplaceAllowance,
  resetToken,
} = tokenSlice.actions;
