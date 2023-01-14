import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/web3/";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import { isValidNetwork } from "../../../utils/web3";

const SignIn = () => {
  const { isConnected, address, isConnecting } = useAccount();
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
              {isConnecting ? (
                <h1 className="text-white">Loading...</h1>
              ) : (
                <div className="flex flex-col min-w-full gap-6">
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
