import { types } from "../types/types";

export const uiOpenModal = (type, title, subtitle, body) => ({
  type: types.uiOpenModal,
  payload: {
    type,
    title,
    subtitle,
    body,
  },
});

export const uiCloseModal = () => ({
  type: types.uiCloseModal,
});
