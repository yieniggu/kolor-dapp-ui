import { getAllowance } from "../../../helpers/web3/token";
import { connectWallet, isMetamaskInstalled } from "../../../utils/metamask";
import { initWalletConnectProvider } from "../../../utils/walletConnect";
import { networks } from "../../../utils/web3/supportedChains";
import { logout } from "../auth/authSlice";
import { resetDao } from "../dao/daoSlice";
import { resetNFT, setLoginType } from "../NFT";
import { resetToken } from "../token/tokenSlice";
import { closeModal, openModal } from "../UI/uiSlice";
import {
  checkingConnection,
  connect,
  connectionErrorDetected,
  reset,
  setConnectionLoading,
  setMarketplaceAllowance,
} from "./connectionSlice";

/* Check if Metamask wallet is installed (i.e. mm) */
export const checkMetamask = () => {
  return async (dispatch) => {
    dispatch(checkingConnection({ loading: true, provider: null }));

    let { provider, installed } = await isMetamaskInstalled();

    if (installed) {
      provider = initProvider(provider, dispatch, "Metamask");
      dispatch(checkingConnection({ loading: false, provider }));
      const { account, errorMessage } = await connectWallet(provider);

      if (account && isValidNetwork(provider.networkVersion)) {
        console.log("valid account!");
        dispatch(setConnectionLoading(false));

        const allowance = await getAllowance(account, provider);
        dispatch(setMarketplaceAllowance(allowance));
        dispatch(connect({ account, connector: "Metamask" }));

        return dispatch(closeModal());
      }

      console.log("error: ", errorMessage);
      dispatch(setConnectionLoading(false));
      dispatch(connectionErrorDetected({ errorMessage }));
      dispatch(closeModal());
      return dispatch(openModal({ type: errorMessage, error: true }));
    }

    dispatch(setConnectionLoading(false));
    dispatch(
      connectionErrorDetected({
        error: true,
        errorMessage: "Please install a wallet browser extension!",
      })
    );
    return dispatch(openModal({ type: "noProvider", error: true }));
  };
};

export const checkWalletConnect = () => {
  return async (dispatch) => {
    try {
      let provider = initWalletConnectProvider();

      await provider.enable();

      provider = initProvider(provider, dispatch, "WalletConnect");
      dispatch(checkingConnection({ loading: false, provider }));

      const account = provider.accounts[0];
      const errorMessage = "Error on wallet connect";

      if (account && isValidNetwork(provider.chainId.toString())) {
        console.log("valid account!");
        dispatch(setConnectionLoading(false));

        const allowance = await getAllowance(account, provider);
        dispatch(setMarketplaceAllowance(allowance));
        dispatch(connect({ account, connector: "WalletConnect" }));

        return dispatch(closeModal());
      }

      dispatch(setConnectionLoading(false));
      dispatch(connectionErrorDetected({ errorMessage }));
      dispatch(closeModal());
      return dispatch(openModal({ type: errorMessage, error: true }));
    } catch (e) {
      console.error(e);
      dispatch(setConnectionLoading(false));
      dispatch(connectionErrorDetected({ e }));
      return dispatch(closeModal());
      // return dispatch(openModal({ type: e, error: true }));
    }
  };
};

// All listeners and handlers must go here if
// they change the app state
const initProvider = (provider, dispatch, connector) => {
  // Check if wallet was connected previously
  provider.on("accountsChanged", async (accounts) => {
    dispatch(setConnectionLoading({ loading: true }));

    if (connector === "Metamask") {
      const result = await isMetamaskInstalled();
      provider = result.provider;
    }
    if (connector === "WalletConnect") provider = initWalletConnectProvider();
    dispatch(checkingConnection({ loading: true, provider }));

    if (accounts) {
      dispatch(resetToken());
      const allowance = await getAllowance(accounts[0], provider);
      dispatch(setMarketplaceAllowance(allowance));
      dispatch(connect({ account: accounts[0], connector: "WalletConnect" }));
      return dispatch(setConnectionLoading(false));
    }
  });

  provider.on("networkChanged", async (networkId) => {
    dispatch(setConnectionLoading({ loading: true }));
    if (connector === "Metamask") {
      const result = await isMetamaskInstalled();
      provider = result.provider;
      dispatch(checkMetamask({ loading: true, provider }));
    }
    if (connector === "WalletConnect") {
      provider = initWalletConnectProvider();
      dispatch(checkWalletConnect());
    }

    if (!isValidNetwork(networkId)) {
      dispatch(
        connectionErrorDetected({
          error: true,
          errorMessage: "Unsupported Network!",
        })
      );

      dispatch(openModal({ type: "unsupportedNetwork", error: true }));
      localStorage.setItem("authorized", JSON.stringify(false));
      dispatch(reset());
      dispatch(resetToken());
    }

    return dispatch(setConnectionLoading(false));
  });

  return provider;
};

const isValidNetwork = (networkId) => {
  return networks.some((network) => network.id === networkId);
};

export const resetConnector = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(setLoginType(null));
    dispatch(logout());
    dispatch(resetNFT());
    dispatch(resetToken());
    dispatch(resetDao());
    dispatch(reset());
  };
};
