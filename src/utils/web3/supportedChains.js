export const networks = [
  {
    name: "celo-mainnet",
    id: "42220",
    explorer: "https://explorer.celo.org/mainnet/",
    explorerApi: "https://explorer.celo.org/mainnet/api",
    rpcConfig: {
      chainId: `0x${Number("42220").toString(16)}`,
      chainName: "Celo Mainnet",
      nativeCurrency: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18,
      },
      rpcUrls: ["https://forno.celo.org"],
      blockExplorerUrls: ["https://explorer.celo.org/mainnet/"],
    },
  },
];

export const errorMessages = [
  {
    type: "unsupportedNetwork",
    title: "Unsupported Network!",
    subtitle: "The network selected is currently not supported :(",
    solution: "Please change to one of the supported networks :)",
  },
  {
    type: "ethRequestAccounts",
    title: "Awaiting wallet connection",
    subtitle: "The dAPP is requesting access to your account",
    solution: "Please accept connection to your wallet to proceed",
  },
];
