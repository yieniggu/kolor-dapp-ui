import WalletConnectProvider from "@walletconnect/web3-provider";

export const initWalletConnectProvider = () => {
  const provider = new WalletConnectProvider({
    rpc: {
      42220: "https://forno.celo.org",
    },
  });

  console.log("provider: ", provider);

  return provider;
};
