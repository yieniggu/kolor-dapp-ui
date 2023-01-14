import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { publicProvider } from "@wagmi/core/providers/public";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

const celo = {
  id: 42_220,
  name: "Celo Mainnet",
  network: "celo",
  nativeCurrency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
  rpcUrls: { default: { http: ["https://forno.celo.org"] } },
  blockExplorers: {
    default: {
      name: "CeloExplorer",
      url: "https://explorer.celo.org/mainnet/",
    },
  },
  iconUrls: ["https://i.ibb.co/6tQ2vdv/celo-logo.png"],
};

export const { chains, provider } = configureChains(
  [celo],
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
