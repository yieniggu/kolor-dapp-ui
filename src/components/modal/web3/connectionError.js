import React from "react";
import { useSelector } from "react-redux";
import CeloLogo from "../../../assets/logo/celo-logo.png";
import { switchNetwork } from "../../../utils/metamask";

export const ConnectionError = () => {
  const { connectionError, connector } = useSelector(
    (state) => state.connection
  );

  const handleNetworkSwitch = async () => {
    connector === "Metamask" && (await switchNetwork());
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-md text-white text-center mb-6">
        {connectionError.errorMessage === "unsupportedNetwork" &&
          "Unsupported network"}
      </h1>
      <p className="text-sm">
        The network you're connected is currently not supported.
      </p>
      <p className="text-center">Change to CELO mainnet to access.</p>
      <button
        className="text-sm w-3/5 mx-auto rounded-full border mt-4 bg-interaction text-white hover:bg-opacity-100 bg-opacity-75 px-4"
        onClick={handleNetworkSwitch}
      >
        <div className="flex flex-row gap-4">
          <img className="w-6 h-6 my-auto" src={CeloLogo} />
          <p>Connect to CELO mainnet</p>
        </div>
      </button>
    </div>
  );
};
