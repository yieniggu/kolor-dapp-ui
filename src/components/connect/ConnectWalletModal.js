import React from "react";
import { useDispatch } from "react-redux";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { closeModal } from "../../store/slices/UI/uiSlice";
import { isValidNetwork } from "../../utils/web3";
import { ConnectWalletButton } from "./ConnectWalletButton";

import Celo from "../../assets/logo/celo-logo.png";

export const ConnectWalletModal = () => {
  const { connectors } = useConnect();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-10 py-2">
      {isConnected && !isValidNetwork(chain.id) ? (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h1 className="text-md text-gray-600 mx-auto">Wrong Network</h1>
            <p
              className="absolute top-0 right-2 text-sm text-white ml-auto mb-auto cursor-pointer"
              onClick={() => dispatch(closeModal())}
            >
              x
            </p>
          </div>

          <h2 className="text-center text-gray-100">
            Connected to {chain.name}
          </h2>
          {chains.map((x) => (
            <button
              className="bg-app-main-100 text-sm w-fit py-2 px-4 mx-auto mt-8 rounded-full hover:bg-app-cyan text-white"
              disabled={!switchNetwork || x.id === chain?.id}
              key={x.id}
              onClick={() => switchNetwork?.(x.id)}
            >
              <div className="flex flex-row gap-2">
                <img className="w-6 h-6 my-auto" src={Celo} />
                Switch to {x.name}
                {isLoading && pendingChainId === x.id && " (switching)"}
              </div>
            </button>
          ))}

          <div>
            {error && (
              <p className="text-red-600 text-center">{error.message}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:px-6">
          <div className="flex flex-row">
            <h1 className="text-md text-gray-600 mx-auto">Choose Wallet</h1>
            <p
              className="text-sm text-white ml-auto mb-auto cursor-pointer"
              onClick={() => dispatch(closeModal())}
            >
              x
            </p>
          </div>
          {connectors.map((connector) => (
            <ConnectWalletButton key={connector.id} connector={connector} />
          ))}
        </div>
      )}
    </div>
  );
};
