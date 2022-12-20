import detectEthereumProvider from "@metamask/detect-provider";
import { networks } from "./web3/supportedChains";

export const isMetamaskInstalled = async () => {
  const provider = await detectEthereumProvider();

  if (provider) {
    console.log("Provider installed: ", provider);
    return { provider, installed: true };
  } else {
    console.log("Please install a wallet browser extension like Metamask");
    return { provider: null, installed: false };
  }
};

export const connectWallet = async (provider) => {
  try {
    console.log("Connecting wallet...");
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });

    // check if we support the network a user is connected to
    if (networks.some((network) => network.id === provider.networkVersion)) {
      localStorage.setItem("authorized", JSON.stringify(true));

      return { account: accounts[0], errorMessage: null };
    } else {
      return { account: null, errorMessage: "unsupportedNetwork" };
    }
  } catch (e) {
    console.error("Error: ", e);

    if (e.message.includes("eth_requestAccounts"))
      return { account: null, errorMessage: "ethRequestAccounts" };

    return { account: null, errorMessage: e.message };
  }
};

export const switchNetwork = async () => {
  const { rpcConfig, id } = networks[0];
  const { ethereum } = window;

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(id).toString(16)}` }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [rpcConfig],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
    // handle other "switch" errors
  }
};
