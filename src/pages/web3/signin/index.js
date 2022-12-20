import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../layout/web3/";
import { useDispatch, useSelector } from "react-redux";
import Metamask from "../../../assets/icons/ico_metamask.svg";
import Valora from "../../../assets/logo/valora.jpeg";
import {
  checkMetamask,
  checkWalletConnect,
  resetConnector,
  setConnector,
} from "../../../store/slices/connection";
import { useEffect } from "react";

const SignIn = () => {
  const { account, connector, connectionLoading } = useSelector(
    (state) => state.connection
  );

  const dispatch = useDispatch();

  const handleLogin = ({ target }) => {
    console.log(target.name);

    if (target.name === "metamask" && !account) {
      dispatch(checkMetamask());

      dispatch(setConnector("Metamask"));
      account && navigate("/marketplace");
    } else {
      account && dispatch(resetConnector());
    }
  };

  const handleWalletConnect = async () => {
    dispatch(checkWalletConnect());
  };

  const navigate = useNavigate();

  useEffect(() => {
    account && navigate("/marketplace");
  }, [account]);

  return (
    <>
      <Layout title="Kolor | Sign in">
        <div className="flex bg-signin min-h-screen mt-40 justify-center px-4">
          <div className="flex flex-col h-full w-full tiny:w-96 bg-body rounded-3xl py-6">
            <div className="flex flex-col px-3 sm:px-6 items-center gap-3">
              <div className="text-white text-md py-2">Connect Wallet</div>
              {connectionLoading ? (
                <h1 className="text-white">Loading...</h1>
              ) : (
                <div className="flex flex-col min-w-full gap-6">
                  <div className="flex flex-row gap-3 sm:gap-6 shrink-0 min-w-full w-full">
                    <img src={Metamask} alt="metamask" className="w-6" />
                    <button
                      className="bg-light rounded-2xl shrink-0 min-w-96 w-4/5 py-3 px-4 text-orange-500"
                      onClick={handleLogin}
                      name="metamask"
                      disabled={account && connector !== "Metamask"}
                    >
                      {account && connector === "Metamask"
                        ? `${account.substr(0, 12)}...${account.substr(
                            28,
                            account.length
                          )}`
                        : account
                        ? `Disconnect from ${connector} first`
                        : "Connect with Metamask"}
                    </button>
                  </div>
                  <div className="flex flex-row gap-3 sm:gap-6 w-full">
                    <img
                      src={Valora}
                      alt="valora"
                      className="w-6 h-6 my-auto"
                    />
                    <button
                      className="bg-light rounded-2xl shrink-0 min-w-96 w-4/5 py-3 px-4 text-app-main-100"
                      onClick={handleWalletConnect}
                      name="valora"
                      disabled={account && connector !== "Valora"}
                    >
                      {account && connector === "Valora"
                        ? `${account.substr(0, 12)}...${account.substr(
                            28,
                            account.length
                          )}`
                        : account
                        ? `Disconnect from ${connector} first`
                        : "Connect with Valora"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignIn;
