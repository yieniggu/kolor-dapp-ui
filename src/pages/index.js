import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withCookies } from "react-cookie";
import IntroPage from "./intro";
import SignIn from "./signin";
import { startChecking } from "../actions/auth";
import { useEffect } from "react";
import { PrivateRoute } from "./private";
import Dashboard from "./dashboard";
import { PublicRoute } from "./public";
import Marketplace from "./marketplace";
import Land from "./land";
import Buy from "./buy";
import DotLoader from "react-spinners/DotLoader";
import SignUp from "./signup";
import Wallet from "./wallet";

const override = {
  background: "-webkit-linear-gradient(75deg, #41a58d, #eee)",
};

const Pages = () => {
  const { checking, role, uid } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
    console.log("checking...: ", checking);
  }, [dispatch]);

  return checking ? (
    <DotLoader cssOverride={override} loading={checking} />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
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

          <Route path="/lands/:id" element={<Land />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default withCookies(Pages);
