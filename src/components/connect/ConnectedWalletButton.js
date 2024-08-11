import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork } from "wagmi";
import Metamask from "../../assets/logo/Metamask.png";
import WalletConnect from "../../assets/logo/WalletConnect.png";
import Celo from "../../assets/logo/celo-logo.png";

import { openModal } from "../../store/slices/UI/uiSlice";
import { isValidNetwork } from "../../utils/web3";

export const ConnectedWalletButton = () => {
  const { address, connector, isConnected } = useAccount();
  const { chain } = useNetwork();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("address: ", address, isConnected, chain);
    (!address || !isConnected || !isValidNetwork(chain.id)) &&
      navigate("/signin");
  }, [address, chain]);

  return (
    <>
      {address && isConnected && (
        <button
          className="bg-app-main-100 px-4 py-2 rounded-full group opacity-75 hover:opacity-100"
          onClick={() => dispatch(openModal({ type: "walletInfo" }))}
        >
          <div className="flex flex-row gap-4">
            <img className="w-6 h-6" src={Celo} />
            <h2 className="text-gray-300 group-hover:text-gray-100 border-r border-white pr-4">
              {chain.name}
            </h2>
            <img
              className="w-6 rounded-full"
              src={`https://cdn.stamp.fyi/avatar/${address}`}
              alt="Avatar"
            />
            <h2 className="border-r border-white pr-4 text-gray-300 group-hover:text-gray-100">
              {address.substring(0, 6)}...
              {address.substring(34, address.length - 1)}
            </h2>
            <img
              className="w-6"
              src={connector.name === "MetaMask" ? Metamask : WalletConnect}
            />
          </div>
        </button>
      )}
    </>
  );
};
