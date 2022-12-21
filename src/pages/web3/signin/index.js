import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../layout/web3/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import { isValidNetwork } from "../../../utils/web3";

const SignIn = () => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isConnected &&
      address &&
      isValidNetwork(chain.id) &&
      navigate("/marketplace");
  }, [isConnected, address, chain]);

  return (
    <>
      <Layout title="Kolor | Sign in">
        <div className="flex bg-signin min-h-screen mt-40 justify-center px-4">
          <div className="flex flex-col h-full w-full tiny:w-96 bg-body rounded-3xl py-6">
            <div className="flex flex-col px-3 sm:px-6 items-center gap-3">
              <div className="text-white text-md py-2">Welcome</div>
              {false ? (
                <h1 className="text-white">Loading...</h1>
              ) : (
                <div className="flex flex-col min-w-full gap-6">
                  {/* <div className="flex flex-row gap-3 sm:gap-6 shrink-0 min-w-full w-full">
                    <img src={Metamask} alt="metamask" className="w-6" />
                    <button
                      className="bg-light rounded-2xl shrink-0 min-w-96 w-4/5 py-3 px-4 text-orange-500"
                      onClick={handleLogin}
                      name="metamask"
                      disabled={account !== "Metamask"}
                    >
                      {account === "Metamask"
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
                      disabled={account !== "Valora"}
                    >
                      {account === "Valora"
                        ? `${account.substr(0, 12)}...${account.substr(
                            28,
                            account.length
                          )}`
                        : account
                        ? `Disconnect from ${connector} first`
                        : "Connect with Valora"}
                    </button>
                  </div> */}

                  <div className="mx-auto">
                    <ConnectButton label="Sign in" />
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
