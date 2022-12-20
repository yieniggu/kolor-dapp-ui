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
import { PrivateRoute } from "./private";
import Dashboard from "../pages/web2/dashboard";
import { PublicRoute } from "./public";
import DotLoader from "react-spinners/DotLoader";
import { startChecking } from "../store/slices/auth/thunks";
import SignIn from "../pages/web2/signin";
import SignUp from "../pages/web2/signup";
import Buy from "../pages/web2/buy";
import Wallet from "../pages/web2/wallet";
import Land from "../pages/web2/land";
import { DaoCommunity } from "../pages/web2/dashboard/dao/daoCommunity";
import { Proposal } from "../pages/web2/dashboard/dao/proposal";
import Marketplace from "../pages/web2/marketplace";

const override = {
  background: "-webkit-linear-gradient(75deg, #41a58d, #eee)",
};

const Web2Pages = () => {
  const { checking, role, uid } = useSelector((state) => state.auth);
  const { loginType } = useSelector((state) => state.NFT);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
    console.log("checking...: ", checking);
  }, [dispatch]);

  return checking && !uid ? (
    <DotLoader cssOverride={override} loading={checking} />
  ) : (
    <Routes>
      <Route
        path="/signin"
        element={
          <PublicRoute uid={uid}>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute uid={uid}>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route path="/marketplace" element={<Marketplace />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute uid={uid}>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="lands/:id/buy"
        element={
          <PrivateRoute uid={uid}>
            <Buy />
          </PrivateRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <PrivateRoute uid={uid}>
            <Wallet />
          </PrivateRoute>
        }
      />

      <Route
        path="/lands/:id"
        element={
          <PrivateRoute uid={uid}>
            <Land />
          </PrivateRoute>
        }
      />

      <Route
        path="/dao/:id"
        element={
          <PrivateRoute uid={uid}>
            <DaoCommunity />
          </PrivateRoute>
        }
      />

      <Route
        path="/dao/:id/proposals/:proposal"
        element={
          <PrivateRoute uid={uid}>
            <Proposal />
          </PrivateRoute>
        }
      />

      {loginType && uid && (
        <Route path="/*" element={<Navigate to="/marketplace" />} />
      )}
    </Routes>
  );
};

export default withCookies(Web2Pages);
