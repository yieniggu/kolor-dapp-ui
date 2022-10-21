import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { authReducer } from "./authReducer";
import { NFTReducer } from "./NFTReducer";
import { uiReducer } from "./uiReducer";
import { types } from "../types/types";

// All reducers used combined in one
export const rootReducer = (state, action) => {
  if (action.type === types.authLogout) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const appReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  NFT: NFTReducer,
  token: tokenReducer,
});
