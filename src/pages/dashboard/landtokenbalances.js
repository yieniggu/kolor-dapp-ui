import React from "react";
import { LandTokenBalanceItem } from "../../components/items/landtokenbalanceitem";

export const LandTokenBalances = ({ landTokenBalances }) => {
  return (
    <>
      {landTokenBalances.map((landTokenBalance, index) =>
        landTokenBalance != 0 ? (
          <LandTokenBalanceItem
            key={index}
            landTokenBalance={landTokenBalance}
            index={index}
          />
        ) : (
          ""
        )
      )}
    </>
  );
};
