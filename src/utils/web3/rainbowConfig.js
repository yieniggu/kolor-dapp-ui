import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { publicProvider } from "@wagmi/core/providers/public";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

const Celo = {
  id: 42220,
  name: "Celo Mainnet",
  network: "Celo Mainnet",
  iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/celo.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO",
  },
  rpcUrls: {
    default: { http: ["https://forno.celo.org"] },
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://explorer.celo.org/mainnet",
    },
    etherscan: { name: "CeloScan", url: "https://celoscan.io" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 13112599,
    },
  },
  testnet: false,
};

export const { chains, provider } = configureChains(
  [Celo],
  [
    jsonRpcProvider({ rpc: () => ({ http: "https://forno.celo.org" }) }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Kolor dAPP",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
