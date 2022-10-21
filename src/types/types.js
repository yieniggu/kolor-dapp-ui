// Types used for setting states on redux
export const types = {
  uiOpenModal: "[ui] Open modal with messages",
  uiCloseModal: "[ui] Close modal",

  NFTMintToggle: "[NFT] Starting or (ending with errors) new NFT",
  NFTMintFinished: "[NFT] New NFT Minted success",

  NFTGetStart: "[NFT] Getting land information",
  NFTGetFinished: "[NFT] Land information fetched",
  NFTErrorTrue: "[NFT] Error on fetching nft info",
  NFTErrorFalse: "[NFT] Init or success on fetching",

  NFTsGetStart: "[NFT] Getting all lands information",
  NFTsGetFinished: "[NFT] All Lands information fetched",

  NFTsGetPublished: "[NFT] Getting published lands",
  NFTsGetPublishedFinished: "[NFT] All published lands fetched",

  NFTPublishingSof: "[NFT] Publishing selected land to marketplace sof",
  NFTPublishing: "[NFT] Land published succesfully",

  tokensGetStart: "[token] Fetching token assets balances",
  tokensGetFinish: "[token] Finish fetching token assets",

  tokenAcquire: "[token] Acquire land tokens",

  investmentsGetStart: "[token] Fetching investments",
  investmentsGetFinish: "[token] Finish fetching investments",

  authCheckingFinish: "[auth] Finish checking login state",
  authLogin: "[auth] Login",
  authRegister: "[auth] Register",
  authStartTokenRenew: "[auth] Start token Renew",
  authLogout: "[auth] Logout",
};
