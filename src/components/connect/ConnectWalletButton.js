import React from "react";
import { useConnect } from "wagmi";
import Metamask from "../../assets/logo/Metamask.png";
import WalletConnect from "../../assets/logo/WalletConnect.png";

export const ConnectWalletButton = ({ connector }) => {
  const { connect, error, isLoading, pendingConnector } = useConnect();

  return (
    <div className="flex flex-col gap-2">
      {connector.ready && (
        <button
          disabled={!connector.ready}
          onClick={() => connect({ connector })}
        >
          <div className="flex flex-row gap-6 p-6 bg-app-main-100 rounded-md group opacity-75 hover:opacity-100 cursor-pointer">
            <img
              className="w-10"
              src={connector.name === "MetaMask" ? Metamask : WalletConnect}
            />
            <h1 className="my-auto text-sm text-gray-600 group-hover:text-gray-300">
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </h1>
          </div>
        </button>
      )}

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
