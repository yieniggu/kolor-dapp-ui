import { types } from "../types/types";

const initialState = {
  checkingBalances: true,
  checkingInvestments: true,
  buying: false,
  balances: {},
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.tokensGetStart:
      return {
        ...state,
        checkingBalances: true,
      };

    case types.tokensGetFinish:
      return {
        ...state,
        checkingBalances: action.payload.checkingBalances,
        balances: action.payload.balances,
      };

    case types.tokenAcquire:
      return {
        ...state,
        buying: action.payload,
      };

    case types.investmentsGetStart:
      return {
        ...state,
        checkingInvestments: true,
      };

    case types.investmentsGetFinish:
      return {
        ...state,
        checkingInvestments: false,
        investments: action.payload,
      };

    default:
      return state;
  }
};
