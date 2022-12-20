import Swal from "sweetalert2";
import { fetchWithoutToken } from "../../../helpers/fetch";
import {
  setGettingNFT,
  setGettingPublishedNFTs,
  setLandsFirstFetch,
  setNFT,
  setPublishedNFTs,
} from "./NFTSlice";

const blockscoutURL = "https://alfajores-blockscout.celo-testnet.org";

export const getNFT = (id) => {
  return async (dispatch) => {
    dispatch(setGettingNFT(true));

    const resp = await fetchWithoutToken(`lands/${id}`);
    const body = await resp.json();

    if (body.ok) {
      dispatch(setNFT(body.NFTInfo));
    } else {
      console.log("error on getting nft");
    }

    console.log(body);
    return dispatch(setGettingNFT(false));
  };
};

export const getPublishedNFTs = () => {
  return async (dispatch) => {
    dispatch(setGettingPublishedNFTs(true));

    const resp = await fetchWithoutToken("marketplace");
    const body = await resp.json();

    console.log(body);
    dispatch(setPublishedNFTs(body.publishedLands));
    dispatch(setLandsFirstFetch(false));

    return dispatch(setGettingPublishedNFTs(false));
  };
};

export const confirmationMessage = (receipts) => {
  let receiptsMessages = "";
  receipts.map((receipt) => (receiptsMessages += getReceiptInfo(receipt)));

  return `Please check the following transactions: <br/> ${receiptsMessages}`;
};

export const getReceiptInfo = (receipt) => {
  return `<br/>
    <strong>
    <a href="${
      blockscoutURL +
      "/tx/" +
      receipt.receipt.transactionHash +
      "/internal-transactions"
    }" target="_blank">${receipt.transaction}</a>
    </strong> <br/>`;
};
