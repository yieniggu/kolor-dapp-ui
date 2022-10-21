import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { confirmationMessage, getNFT } from "./NFT";
import { uiOpenModal } from "./UI";

export const getAssetsBalances = (uid) => {
  return async (dispatch) => {
    dispatch(getAssetsStartAction());

    const resp = await fetchWithToken("tokens/" + uid);

    const body = await resp.json();

    console.log(body);

    if (body.ok) {
      dispatch(getAssetsFinishAction(body.balances));
    } else {
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(getAssetsFinishAction({}));
    }
  };
};

const getAssetsStartAction = () => ({
  type: types.tokensGetStart,
});

const getAssetsFinishAction = (balances) => ({
  type: types.tokensGetFinish,
  payload: {
    checking: false,
    balances,
  },
});

export const acquireLandTokens = (tokenId, amount, uid, unit) => {
  return async (dispatch) => {
    dispatch(acquireLandTokensAction(true));

    const resp = await fetchWithToken(
      `marketplace/tokens/${tokenId}`,
      { amount },
      "POST"
    );

    const body = await resp.json();
    console.log(body);

    if (body.ok) {
      // Swal.fire({
      //   title: "You're now a holder!",
      //   html: confirmationMessage(body.receipts),
      // });

      dispatch(acquireLandTokensAction(false));
      dispatch(getNFT(tokenId));
      dispatch(getAssetsBalances(uid));
      dispatch(getInvestments());

      const title = `Success - You are now protecting ${amount} ${unit} in Patagonia!`;
      const subtitle = "For further notice, check transaction in explorer:";
      dispatch(uiOpenModal("success", title, subtitle, body.receipts));
    } else {
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(acquireLandTokensAction(false));
    }
  };
};

const acquireLandTokensAction = (buying) => ({
  type: types.tokenAcquire,
  payload: buying,
});

export const getInvestments = (uid) => {
  return async (dispatch) => {
    dispatch(getInvestmentsStartAction());
    const resp = await fetchWithToken(`tokens/investments/${uid}`);

    const body = await resp.json();
    console.log(body);

    if (body.ok) {
      dispatch(getInvestmentsFinishAction(body.investments));
    } else {
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(getInvestmentsFinishAction(null));
    }
  };
};

const getInvestmentsStartAction = () => ({
  type: types.investmentsGetStart,
});

const getInvestmentsFinishAction = (investments) => ({
  type: types.investmentsGetFinish,
  payload: investments,
});
