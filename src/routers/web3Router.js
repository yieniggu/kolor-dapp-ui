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

const override = {
  background: "-webkit-linear-gradient(75deg, #41a58d, #eee)",
};

const Web3Pages = () => {
  const { loginType } = useSelector((state) => state.NFT);
  const { account } = useSelector((state) => state.connection);

  return (
    <div>
      <AppModal />

      <Routes>
        <Route path="/signin" element={<SignIn />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/marketplace" element={<Marketplace />} />

        <Route path="lands/:id/buy" element={<Buy />} />

        <Route path="/wallet" element={<Wallet />} />

        <Route path="/dao/:id" element={<DaoCommunity />} />

        <Route path="/dao/:id/proposals/:proposal" element={<Proposal />} />

        {loginType && account && (
          <Route path="/*" element={<Navigate to="/marketplace" />} />
        )}
      </Routes>
    </div>
  );
};

export default withCookies(Web3Pages);
