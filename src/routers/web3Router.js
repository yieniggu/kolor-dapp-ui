import {
  Route,
  BrowserRouter,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withCookies } from "react-cookie";
import { useEffect } from "react";
import SignIn from "../pages/web3/signin";
import Marketplace from "../pages/web3/marketplace";
import Buy from "../pages/web3/buy";
import Wallet from "../pages/web3/wallet";
import Dashboard from "../pages/web3/dashboard";
import { AppModal } from "../components/modal/web3";
import { DaoCommunity } from "../pages/web3/dashboard/dao/daoCommunity";
import { Proposal } from "../pages/web3/dashboard/dao/proposal";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, wagmiClient } from "../utils/web3/newRainbowConfig";

import "@rainbow-me/rainbowkit/styles.css";

const Web3Pages = () => {
  const { loginType } = useSelector((state) => state.NFT);

  return (
    <div>
      <AppModal />

      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/marketplace" element={<Marketplace />} />

            <Route path="lands/:id/buy" element={<Buy />} />

            <Route path="/wallet" element={<Wallet />} />

            <Route path="/dao/:id" element={<DaoCommunity />} />

            <Route path="/dao/:id/proposals/:proposal" element={<Proposal />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
};

export default withCookies(Web3Pages);
