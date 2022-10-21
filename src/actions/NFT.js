import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

const blockscoutURL = "https://alfajores-blockscout.celo-testnet.org";

export const mintNFT = (NFT) => {
  return async (dispatch) => {
    dispatch(mintNFTActionToggle());

    const resp = await fetchWithToken("lands", NFT, "POST");

    const body = await resp.json();

    console.log(body);
    if (body.ok) {
      dispatch(mintNFTActionFinish(NFT));
      Swal.fire(
        {
          title: "A new land has been minted!",
          html: confirmationMessage(body.receipts),
        },
        "success"
      );
    } else {
      Swal.fire("Error!", "Something went wrong =(", "error");
      dispatch(mintNFTActionToggle());
    }
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

const mintNFTActionToggle = () => ({
  type: types.NFTMintToggle,
});

export const mintNFTActionFinish = (NFT) => ({
  type: types.NFTMintFinished,
  payload: NFT,
});

export const getNFT = (id) => {
  return async (dispatch) => {
    dispatch(NFTErrorFalseAction());
    dispatch(getNFTAction());
    const resp = await fetchWithoutToken(`lands/${id}`);
    const body = await resp.json();

    if (body.ok) {
      dispatch(finishGetNFTAction(body.NFTInfo));
    } else {
      console.log("error on getting nft");
      dispatch(NFTErrorTrueAction());
    }

    console.log(body);
  };
};

export const getNFTAction = () => ({
  type: types.NFTGetStart,
});

export const finishGetNFTAction = (NFT) => ({
  type: types.NFTGetFinished,
  payload: NFT,
});

const NFTErrorTrueAction = () => ({
  type: types.NFTErrorTrue,
});

export const NFTErrorFalseAction = () => ({
  type: types.NFTErrorFalse,
});

export const getAllNFTs = () => {
  return async (dispatch) => {
    dispatch(getAllNFTsAction());

    const resp = await fetchWithoutToken("lands");
    const body = await resp.json();

    const { notBurnedNFTs } = body;

    dispatch(finishGetAllNFTsAction(notBurnedNFTs));
    dispatch(
      finishGetPublishedNFTsAction(
        notBurnedNFTs.filter((NFT) => NFT.state === "3")
      )
    );
    console.log(body);
  };
};

const getAllNFTsAction = () => ({
  type: types.NFTsGetStart,
});

const finishGetAllNFTsAction = (NFTs) => ({
  type: types.NFTsGetFinished,
  payload: NFTs,
});

export const getPublishedNFTs = () => {
  return async (dispatch) => {
    dispatch(getPublishedNFTsAction());

    const resp = await fetchWithoutToken("marketplace");
    const body = await resp.json();

    console.log(body);
    dispatch(finishGetPublishedNFTsAction(body.publishedLands));
  };
};

const getPublishedNFTsAction = () => ({
  type: types.NFTsGetPublished,
});

const finishGetPublishedNFTsAction = (NFTs) => ({
  type: types.NFTsGetPublishedFinished,
  payload: NFTs,
});

export const publishLand = (mintedLands, tokenId) => {
  return async (dispatch) => {
    mintedLands[tokenId].publishing = true;
    dispatch(publishNFTActionSof(mintedLands));

    const resp = await fetchWithToken(
      `lands/${tokenId}/state`,
      { state: "3" },
      "PUT"
    );

    const body = await resp.json();

    console.log(body);

    if (body.ok) {
      mintedLands[tokenId].publishing = false;
      mintedLands[tokenId].state = "3";
      dispatch(publishNFTAction(mintedLands, mintedLands[tokenId]));
    } else {
      mintedLands.publishing = false;
      dispatch(publishNFTActionSof(mintedLands));
      Swal.fire("Error", "Something went wrong =(", "error");
    }
  };
};

const publishNFTActionSof = (mintedLands) => ({
  type: types.NFTPublishingSof,
  payload: mintedLands,
});

const publishNFTAction = (mintedLands, publishedNFT) => ({
  type: types.NFTPublishing,
  payload: {
    mintedLands,
    publishedNFT,
  },
});
