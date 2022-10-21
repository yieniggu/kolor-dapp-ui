import { types } from "../types/types";

const initialState = {
  allNFTs: [],
  publishedNFTs: [],
  NFT: {},
  NFTError: false,
  mintingNFT: false,
  mintingNFTSuccess: false,
  gettingNFT: true,
  gettingNFTs: true,
  gettingPublishedNFTs: true,
  landsFirstFetch: true,
};
// Reducer to handle ui changes like opening a modal
export const NFTReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NFTMintToggle:
      return {
        ...state,
        mintingNFT: !state.mintingNFT,
        mintingNFTSuccess: false,
      };

    case types.NFTMintFinished:
      return {
        ...state,
        mintingNFT: false,
        mintingNFTSuccess: true,
        NFTs: [...state.allNFTs, action.payload],
      };

    case types.NFTsGetStart:
      return {
        ...state,
        gettingNFTs: true,
      };

    case types.NFTsGetFinished:
      return {
        ...state,
        gettingNFTs: false,
        allNFTs: action.payload,
        landsFirstFetch: false,
      };

    case types.NFTGetStart:
      return {
        ...state,
        gettingNFT: true,
      };

    case types.NFTGetFinished:
      return {
        ...state,
        gettingNFT: false,
        NFTError: false,
        NFT: action.payload,
      };

    case types.NFTErrorTrue:
      return {
        ...state,
        NFTError: true,
        gettingNFT: false,
      };

    case types.NFTErrorFalse:
      return {
        ...state,
        gettingNFT: false,
        NFTError: false,
      };

    case types.NFTsGetPublished:
      return {
        ...state,
        gettingPublishedNFTs: true,
      };

    case types.NFTsGetPublishedFinished:
      return {
        ...state,
        gettingPublishedNFTs: false,
        publishedNFTs: action.payload,
      };

    case types.NFTPublishingSof:
      return {
        ...state,
        allNFTs: action.payload,
      };

    case types.NFTPublishing:
      return {
        ...state,
        allNFTs: action.payload.mintedLands,
        publishedNFTs: [...state.publishedNFTs, action.payload.publishedNFT],
      };

    default:
      return state;
  }
};
