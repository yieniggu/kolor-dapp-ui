import React from "react";
import { useSelector } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";

export const DaoItem = ({ balance, index }) => {
  const { publishedNFTs } = useSelector((state) => state.NFT);
  const { balances } = useSelector((state) => state.token);

  return (
    <>
      {balance > 0 && (
        <div className="flex flex-col rounded-lg border border-gray-600 w-80 h-70 py-6">
          <h1 className="text-white text-sm font-sans text-center">
            {publishedNFTs[index].name}{" "}
            <span className="text-app-green">DAO</span>
          </h1>
          <PieChart
            className="w-40 mx-auto my-4"
            animate={true}
            data={[
              { title: balances.address, value: balance, color: "#00a78d" },
              {
                title: "others",
                value:
                  publishedNFTs[index].landTokenInfo.currentAmount - balance,
                color: "#374151",
              },
            ]}
            totalValue={publishedNFTs[index].landTokenInfo.currentAmount}
          />
          <div className="flex flex-row justify-center gap-2">
            <div className="flex flex-col mx-4">
              <div className="flex flex-row gap-2">
                <i className="fa-solid fa-bolt text-white my-auto"></i>
                <h2 className="font-sans text-white text-center">
                  Voting power
                </h2>
              </div>

              <span className="text-app-green text-center text-md">
                {balance}
              </span>
            </div>
            <div className="flex flex-col mx-4">
              <div className="flex flex-row gap-2">
                <i className="fa-solid fa-chart-pie my-auto text-white"></i>
                <h2 className="font-sans text-white text-center">
                  Participation
                </h2>
              </div>

              <span className="text-app-green text-center text-md">
                {Math.round(
                  (balance / publishedNFTs[index].landTokenInfo.currentAmount) *
                    100
                )}{" "}
                %
              </span>
            </div>
          </div>
          <button className="text-white bg-interaction bg-opacity-75 hover:bg-opacity-100 w-4/5 mx-auto rounded-full mt-5 py-1 text-sm">
            <Link to={`/dao/${publishedNFTs[index].identifier}`}>
              Community
            </Link>
          </button>
        </div>
      )}
    </>
  );
};
