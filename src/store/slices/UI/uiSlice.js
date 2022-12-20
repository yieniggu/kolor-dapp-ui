import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  title: null,
  subtitle: null,
  body: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.title = payload.title;
      state.subtitle = payload.subtitle;
      state.body = payload.body;
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = uiSlice.actions;
