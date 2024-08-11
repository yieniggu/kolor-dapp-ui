import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from "wagmi";

import Copy from "../../assets/icons/ico_copy.svg";
import Tick from "../../assets/icons/ico_tick.svg";
import OpenLink from "../../assets/icons/open-link.png";

import Metamask from "../../assets/logo/Metamask.png";
import WalletConnect from "../../assets/logo/WalletConnect.png";
import Celo from "../../assets/logo/celo-logo.png";

import { closeModal } from "../../store/slices/UI/uiSlice";
import { isValidNetwork } from "../../utils/web3";
import { useNavigate } from "react-router-dom";

export const WalletInformation = () => {
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { chain } = useNetwork();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const copyClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    console.log("address: ", address, isConnected, chain);
    (!address || !isConnected || !isValidNetwork(chain.id)) &&
      navigate("/signin");
  }, [address, chain]);

  return (
    <div className="flex flex-col px-4 gap-2 font-mono">
      <p
        className="absolute top-0 right-2 text-sm text-white cursor-pointer"
        onClick={() => dispatch(closeModal())}
      >
        x
      </p>
      <h1 className="text-sm text-center mb-6">Account Details</h1>
      <img
        className="w-12 mx-auto rounded-full"
        src={`https://cdn.stamp.fyi/avatar/${address}`}
        alt="Avatar"
      />
      <div className="flex flex-row justify-between bg-app-main-100 rounded-md px-2 gap-6">
        <h2 className="">
          {address?.substring(0, 12)}...
          {address?.substring(28, address.length - 1)}
        </h2>
        <button onClick={() => copyClipboard()}>
          {copied ? (
            <img src={Tick} alt="tick" />
          ) : (
            <img src={Copy} alt="copy" />
          )}
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <h2>Connector: </h2>
          <img
            className="w-6"
            src={connector?.name === "MetaMask" ? Metamask : WalletConnect}
          />
        </div>

        {address && (
          <a
            className="group"
            href={`https://explorer.celo.org/mainnet/address/${address}`}
            target="_blank"
          >
            {" "}
            <div className="flex flex-row gap-2">
              <img className="w-6 h-6 my-auto" src={Celo} />
              <h2 className="mx-auto group-hover:text-gray-200">Explorer</h2>
              <img className="w-4 h-4 my-auto" src={OpenLink} />
            </div>
          </a>
        )}
      </div>
      <button
        className="mx-auto border border-red-500 text-red-500 rounded-full px-4 mt-4 hover:bg-red-500 hover:text-gray-100"
        onClick={() => {
          dispatch(closeModal());
          disconnect();
        }}
      >
        Disconnect
      </button>
    </div>
  );
};
