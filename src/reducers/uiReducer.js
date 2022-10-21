import { types } from "../types/types";

const initialState = {
  isOpen: false,
  type: null,
  subtitle: "",
  title: "",
  body: "",
};
// Reducer to handle ui changes like opening a modal
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        isOpen: true,
        type: action.payload.type,
        title: action.payload.title,
        subtitle: action.payload.subtitle,
        body: action.payload.body,
      };

    case types.uiCloseModal:
      return initialState;

    default:
      return state;
  }
};
