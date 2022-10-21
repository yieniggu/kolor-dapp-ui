import React from "react";
import { normalizeNumber } from "../../utils/web3Utils";

export const SpeciesItem = ({ species, index, selected, handleSelection }) => {
  const { speciesAlias, scientificName, size, decimals } = species;

  return (
    <div
      onClick={() => handleSelection(index)}
      className={`flex flex-col md:flex-row items-center px-6 py-6 rounded-2xl cursor-pointer ${
        selected.index == index ? "bg-gradient" : "bg-body hoverable-btn"
      }`}
    >
      <div className="flex w-full md:w-1/3">{speciesAlias}</div>
      <div className="flex w-full md:w-1/3">{scientificName}</div>
      <div className="flex w-full md:w-1/3">
        {normalizeNumber(size, decimals * -1)} [m2]
      </div>
    </div>
  );
};
