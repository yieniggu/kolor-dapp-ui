import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { daoSlice } from "./slices/dao";
import { NFTSlice } from "./slices/NFT";
import { tokenSlice } from "./slices/token/tokenSlice";
import { uiSlice } from "./slices/UI/uiSlice";
import { connectionSlice } from "./slices/connection";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    connection: connectionSlice.reducer,
    ui: uiSlice.reducer,
    token: tokenSlice.reducer,
    NFT: NFTSlice.reducer,
    dao: daoSlice.reducer,
  },
});
