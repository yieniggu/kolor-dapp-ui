import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allNFTS: null,
  publishedNFTs: null,
  NFT: null,
  gettingNFT: true,
  gettingPublishedNFTs: true,
  landsFirstFetch: true,
  loginType: null,
};

export const NFTSlice = createSlice({
  name: "NFT",
  initialState,
  reducers: {
    setGettingPublishedNFTs: (state, { payload }) => {
      state.gettingPublishedNFTs = payload;
    },
    setPublishedNFTs: (state, { payload }) => {
      state.publishedNFTs = payload;
    },
    setLandsFirstFetch: (state, { payload }) => {
      state.landsFirstFetch = payload;
    },
    setGettingNFT: (state, { payload }) => {
      state.gettingNFT = payload;
    },
    setNFT: (state, { payload }) => {
      state.NFT = payload;
    },
    setLoginType: (state, { payload }) => {
      state.loginType = payload;
    },
    resetNFT: () => initialState,
  },
});

export const {
  setGettingNFT,
  setPublishedNFTs,
  setLandsFirstFetch,
  setGettingPublishedNFTs,
  setLoginType,
  setNFT,
  resetNFT,
} = NFTSlice.actions;
