import React from "react";
import InvestmentItem from "../../../../components/items/investmentitem";

export const Investments = ({ investments }) => {
  return (
    <>
      {investments.map((investment, idx) => (
        <InvestmentItem key={idx} investment={investment} index={idx} />
      ))}
    </>
  );
};
