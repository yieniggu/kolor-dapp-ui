import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proposals: null,
  daoId: null,
  gettingProposals: true,
  creatingProposal: false,
  isVoting: false,
};

export const daoSlice = createSlice({
  name: "dao",
  initialState,
  reducers: {
    setGettingProposals: (state, { payload }) => {
      state.gettingProposals = payload;
    },
    setCreatingProposal: (state, { payload }) => {
      state.creatingProposal = payload;
    },
    setDao: (state, { payload }) => {
      state.daoId = payload.daoId;
      state.proposals = payload.proposals;
    },
    setIsVoting: (state, { payload }) => {
      state.isVoting = payload;
    },
    resetDao: () => initialState,
  },
});

export const {
  setCreatingProposal,
  setDao,
  setGettingProposals,
  setIsVoting,
  resetDao,
} = daoSlice.actions;
