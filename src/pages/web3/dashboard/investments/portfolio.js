import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DotLoader from "react-spinners/DotLoader";
import AOS from "aos";
import MiniMap from "../../../../assets/image/mini-map.png";
import LogoIcon from "../../../../assets/logo/logo_icon.png";
import { useNavigate } from "react-router-dom";
import { getDate } from "../../../../utils/web3";
import { LandTokenBalances } from "./landtokenbalances";
import { Investments } from "./investments";
import {
  getAssetsBalancesFromWallet,
  getInvestmentsFromWallet,
} from "../../../../store/slices/token/thunks";
import { useAccount } from "wagmi";

const override = {
  margin: "0 auto",
  display: "block",
};

export const Portfolio = () => {
  const { balances, gettingBalances, checkingInvestments, investments } =
    useSelector((state) => state.token);

  const { address } = useAccount();

  useEffect(() => {
    if (!investments) {
      dispatch(getInvestmentsFromWallet(address));
    }
  }, [address]);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!balances) {
      dispatch(getAssetsBalancesFromWallet(address));
    }
  }, [address]);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-0 pl-4 tiny:pl-6 sm:pl-12 md:pl-0 pr-4 tiny:pr-6 sm:pr-12 lg:pr-0">
        {checkingInvestments || !investments ? (
          <div className="flex flex-col w-full lg:w-1/2 2xl:w-3/5 border border-main rounded-3xl px-4 sm:px-6 md:px-8 py-8 gap-6">
            <DotLoader
              color="rgba(91, 230, 202, 0.84)"
              loading={checkingInvestments}
              cssOverride={override}
            />{" "}
          </div>
        ) : investments.length == 0 ? (
          <div className="flex flex-col w-full lg:w-1/2 2xl:w-4/5 border border-main rounded-3xl px-4 sm:px-6 md:px-8 py-8 gap-6">
            <div className="text-md text-white text-investment">
              No investments yet...
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full lg:w-1/2 xl:w-4/5 3xl:w-3/5 border border-main rounded-3xl px-4 sm:px-6 md:px-8 py-8 gap-6">
            <h1 className="text-md text-white">Latest Investment</h1>
            <img src={MiniMap} alt="mini-map" className="w-40 pt-6" />
            <div className="text-md text-white text-investment">
              Investment {investments.length}
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
              <div className="flex w-full sm:w-1/2 lg:w-full xl:w-1/2 text-white">
                Tokens bought:
              </div>
              <div className="flex flex-row sm:flex-row-reverse lg:flex-row xl:flex-row-reverse w-full sm:w-1/2 lg:w-full xl:w-1/2 text-app-dark-400">
                {investments[investments.length - 1][2]}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
              <div className="flex w-full sm:w-1/2 lg:w-full xl:w-1/2 text-white">
                Token price:
              </div>
              <div className="flex flex-row sm:flex-row-reverse lg:flex-row xl:flex-row-reverse w-full sm:w-1/2 lg:w-full xl:w-1/2 text-app-dark-400">
                {investments[investments.length - 1][3]} $cUSD
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
              <div className="flex w-full sm:w-1/2 lg:w-full xl:w-1/2 text-white">
                Total paid:
              </div>
              <div className="flex flex-row sm:flex-row-reverse lg:flex-row xl:flex-row-reverse w-full sm:w-1/2 lg:w-full xl:w-1/2 text-app-dark-400">
                {investments[investments.length - 1][2] *
                  investments[investments.length - 1][3]}{" "}
                $cUSD
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
              <div className="flex w-full sm:w-1/2 lg:w-full xl:w-1/2 text-white">
                Date of purchase:
              </div>
              <div className="flex flex-row sm:flex-row-reverse lg:flex-row xl:flex-row-reverse w-full sm:w-1/2 lg:w-full xl:w-1/2 text-app-dark-400">
                {getDate(investments[investments.length - 1][5])}
              </div>
            </div>
            <button
              onClick={() =>
                navigate(`/lands/${investments[investments.length - 1][0]}`)
              }
              className="rounded-full h-12 px-4 py-2 border border-main text-white w-40 hoverable-btn"
            >
              Explore Land
            </button>
          </div>
        )}
        {gettingBalances || !balances ? (
          <div className="flex flex-col w-full lg:w-1/2 2xl:w-2/5 bg-token-detail lg:mx-8 mr-6 md:mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 rounded-3xl px-4 md:px-8 xl:px-10 2xl:px-12 3xl:px-16 py-10 gap-10">
            <DotLoader
              color="rgba(91, 230, 202, 0.84)"
              loading={gettingBalances}
              cssOverride={override}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full lg:w-1/2 2xl:w-2/5 lg:mx-8 mr-6 md:mr-8 lg:mr-10 xl:mr-16 2xl:mr-16 px-4 md:px-8 xl:px-10 2xl:px-6 3xl:px-16 gap-10">
            <div className="flex flex-col gap-6 rounded-xl bg-gray-600 bg-opacity-10 p-8 grow w-full border border-gray-500">
              <div className="flex flex-row justify-center gap-4">
                <img className="w-10 my-auto" src={LogoIcon} />
                <p className="text-white my-auto text-sm">
                  {address.substring(0, 5)}...
                  {address.substring(36)}
                </p>
              </div>
              <h1 className="text-center text-lg text-white font-sans">
                $ {balances.nativeBalances.cUSDBalance}
              </h1>
              <h4 className="text-center font-sans text-sm font-bold text-white">
                Total balance
              </h4>
            </div>
            <div className="flex flex-col gap-6 rounded-xl bg-gray-600 bg-opacity-10 p-8 grow w-full border border-gray-500">
              <div className="flex flex-row justify-center gap-4">
                <div className="rounded-full 3xl:h-12 md:w-10 xl:w-12 xl:h-9 xl:my-auto border-2 w-6 border-app-green"></div>
                <h2 className="text-gray-600 my-auto md:text-md tiny:text-xs overscrol-y-auto">
                  Land Token Balances
                </h2>
              </div>
              <LandTokenBalances
                landTokenBalances={balances.landTokenBalances}
              />
            </div>
          </div>
        )}
      </div>
      <div className="pl-4 tiny:pl-6 sm:pl-12 md:pl-0 text-white text-md text-investment">
        Investment porfolio
      </div>
      {checkingInvestments ? (
        <DotLoader
          color="rgba(91, 230, 202, 0.84)"
          loading={checkingInvestments}
          cssOverride={override}
        />
      ) : (
        <div className="pl-4 tiny:pl-6 sm:pl-12 md:pl-0 grid grid-cols-1 xl:grid-cols-2 grid-flow-row gap-12 pr-4 tiny:pr-6 sm:pr-12">
          <Investments investments={investments} />
        </div>
      )}
    </>
  );
};
