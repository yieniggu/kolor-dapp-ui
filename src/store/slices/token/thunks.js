import Swal from "sweetalert2";
import { fetchWithToken } from "../../../helpers/fetch";
import {
  getInvestmentsOf,
  getLandTokenBalanceFromWallet,
} from "../../../helpers/web3/landToken";
import { buyLandTokens } from "../../../helpers/web3/marketplace";
import { approve, getcUSDBalanceFromWallet } from "../../../helpers/web3/token";
import { setMarketplaceAllowance } from "../connection";
import { getNFT } from "../NFT";
import { openModal } from "../UI/uiSlice";
import {
  setBalances,
  setBuying,
  setCheckingInvestments,
  setGettingBalances,
  setInvestments,
} from "./tokenSlice";

export const getAssetsBalances = (uid) => {
  return async (dispatch) => {
    dispatch(setGettingBalances(true));

    const resp = await fetchWithToken("tokens/" + uid);

    const body = await resp.json();

    console.log(body);

    if (body.ok) {
      dispatch(setBalances(body.balances));
      dispatch(setGettingBalances(false));
    } else {
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(setGettingBalances(false));
    }
  };
};

export const acquireLandTokens = (tokenId, amount, uid, unit) => {
  return async (dispatch) => {
    dispatch(setBuying(true));

    const resp = await fetchWithToken(
      `marketplace/tokens/${tokenId}`,
      { amount },
      "POST"
    );

    const body = await resp.json();
    console.log(body);

    if (body.ok) {
      dispatch(setBuying(false));

      dispatch(getNFT(tokenId));
      dispatch(getAssetsBalances(uid));
      dispatch(getInvestments());

      const title = `You are now protecting ${amount} ${unit} in Patagonia!`;
      const subtitle = "For further notice, check transaction in explorer:";
      dispatch(
        openModal({
          type: "acquireSuccess",
          title,
          subtitle,
          body: body.receipts,
        })
      );
    } else {
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(setBuying(false));
    }
  };
};

export const getInvestments = (uid) => {
  return async (dispatch) => {
    dispatch(setCheckingInvestments(true));
    const resp = await fetchWithToken(`tokens/investments/${uid}`);

    const body = await resp.json();
    console.log(body);

    if (body.ok) {
      dispatch(setInvestments(body.investments));
      dispatch(setCheckingInvestments(false));
    } else {
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(setCheckingInvestments(false));
    }
  };
};

export const getAssetsBalancesFromWallet = (address, provider) => {
  return async (dispatch) => {
    dispatch(setGettingBalances(true));
    console.log("provider: ", provider);

    try {
      const landTokenBalances = await getLandTokenBalanceFromWallet(
        address,
        provider
      );
      const cUSDBalance = await getcUSDBalanceFromWallet(address, provider);

      const balances = {
        landTokenBalances,
        nativeBalances: {
          cUSDBalance,
        },
      };

      dispatch(setBalances(balances));
      dispatch(setGettingBalances(false));
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(setGettingBalances(false));
    }
  };
};

export const getInvestmentsFromWallet = (address, provider) => {
  return async (dispatch) => {
    dispatch(setCheckingInvestments(true));

    const investments = await getInvestmentsOf(address, provider);

    try {
      dispatch(setInvestments(investments));
      dispatch(setCheckingInvestments(false));
    } catch (e) {
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(setCheckingInvestments(false));
    }
  };
};

export const acquireLandTokensFromWallet = (
  account,
  tokenId,
  amount,
  unit,
  provider
) => {
  return async (dispatch) => {
    dispatch(setBuying(true));

    try {
      const receipt = await buyLandTokens(account, tokenId, amount, provider);
      dispatch(setBuying(false));
      const title = `You are now protecting ${amount} ${unit} in Patagonia!`;
      const subtitle = "For further notice, check transaction in explorer:";

      dispatch(
        openModal({
          type: "acquireSuccess",
          title,
          subtitle,
          body: [{ transaction: "New Investment", receipt }],
        })
      );

      setTimeout(() => {
        dispatch(getNFT(tokenId));
        dispatch(getAssetsBalancesFromWallet(account, provider));
        dispatch(getInvestmentsFromWallet(account, provider));
      }, 2000);
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(setBuying(false));
    }
  };
};

export const approveMarketplace = (account, provider) => {
  return async (dispatch) => {
    dispatch(setBuying(true));

    try {
      const receipt = await approve(account, provider);
      console.log("approve receipt: ", receipt);
      dispatch(setBuying(false));
      dispatch(setMarketplaceAllowance("99999999"));
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(setBuying(false));
    }
  };
};
