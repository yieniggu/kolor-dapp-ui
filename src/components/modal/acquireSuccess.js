import React from "react";
import KolorIcon from "../../assets/logo/logo_icon.png";

export const AcquireSuccess = ({ title, subtitle, body }) => {
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-md text-gray-600 font-sorabold text-center">
        Success!
      </h1>
      <img className="w-10 mx-auto" src={KolorIcon} />
      <p className="text-sm">{title}</p>
      <p>{subtitle}</p>
      {body.map((receipt) => (
        <a
          className="text-app-main-100 hover:text-opacity-75"
          href={`https://explorer.celo.org/mainnet/tx/${receipt.receipt.transactionHash}`}
          target="_blank"
        >
          {receipt.transaction}
        </a>
      ))}
    </div>
  );
};
