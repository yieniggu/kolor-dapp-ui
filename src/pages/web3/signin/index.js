import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/web3/";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import { isValidNetwork } from "../../../utils/web3";
import { ConnectWalletModal } from "../../../components/connect/ConnectWalletModal";
import { closeModal, openModal } from "../../../store/slices/UI/uiSlice";

const SignIn = () => {
  const { isConnected, address, isConnecting } = useAccount();
  const { chain } = useNetwork();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isConnected &&
      address &&
      isValidNetwork(chain.id) &&
      dispatch(closeModal()) &&
      navigate("/marketplace");
  }, [isConnected, address, chain]);

  return (
    <>
      <Layout title="Kolor | Sign in">
        <div className="flex bg-signin min-h-screen mt-40 justify-center px-4">
          <div className="flex flex-col h-full w-full tiny:w-96 bg-body rounded-3xl py-6">
            <div className="flex flex-col px-3 sm:px-6 items-center gap-3">
              <div className="text-white text-md py-2">Welcome to Kolor!</div>
              {isConnecting ? (
                <h1 className="text-white">Loading...</h1>
              ) : (
                <div className="flex flex-col min-w-full gap-6">
                  <h2 className="text-sm text-gray-400 text-center">
                    Click the button bellow to start
                  </h2>
                  <div className="mx-auto">
                    <button
                      className="rounded-xl px-4 py-2 bg-app-main-100 hover:opacity-100 opacity-75 text-gray-300"
                      onClick={() =>
                        dispatch(openModal({ type: "connectWallet" }))
                      }
                    >
                      {isConnected && !isValidNetwork(chain.id) ? (
                        <p className="text-red-600 text-sm">Wrong Network</p>
                      ) : (
                        <p>Connect Wallet</p>
                      )}
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
