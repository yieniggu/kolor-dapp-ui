import Layout from "../../layout";
import InvestmentItem from "../../components/items/investmentitem";
import { investmentList } from "./investment";
import SideBar from "../../components/sidebar";
import MiniMap from "../../assets/image/mini-map.png";
import Wallet from "../../assets/image/wallet.png";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssetsBalances, getInvestments } from "../../actions/token";
import { LandTokenBalances } from "./landtokenbalances";
import { getDate } from "../../utils/web3Utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Investments } from "./investments";
import DotLoader from "react-spinners/DotLoader";
import AOS from "aos";
import "aos/dist/aos.css";

const override = {
  margin: "0 auto",
  display: "block",
};

const Dashboard = () => {
  const { balances, checkingBalances } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(balances).length === 0) {
      dispatch(getAssetsBalances());
    }
  }, []);

  const { checkingInvestments, investments } = useSelector(
    (state) => state.token
  );

  useEffect(() => {
    if (!investments) {
      dispatch(getInvestments());
    }
  }, []);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <Layout title="Kolor | Dashboard">
        <div className="flex gap-16 bg-dashboard min-h-screen w-full">
          <SideBar />
          <div className="flex flex-col pt-48 w-full gap-8">
            <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-0 pl-4 tiny:pl-6 sm:pl-12 md:pl-0 pr-4 tiny:pr-6 sm:pr-12 lg:pr-0">
              {checkingInvestments ? (
                <div className="flex flex-col w-full lg:w-1/2 2xl:w-3/5 border border-main rounded-3xl px-4 sm:px-6 md:px-8 py-8 gap-6">
                  <DotLoader
                    color="rgba(91, 230, 202, 0.84)"
                    loading={checkingInvestments}
                    cssOverride={override}
                  />{" "}
                </div>
              ) : investments.length == 0 ? (
                <div className="flex flex-col w-full lg:w-1/2 2xl:w-3/5 border border-main rounded-3xl px-4 sm:px-6 md:px-8 py-8 gap-6">
                  <div className="text-md text-white text-investment">
                    No investments yet...
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full lg:w-1/2 2xl:w-3/5 border border-main rounded-3xl px-4 sm:px-6 md:px-8 py-8 gap-6">
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
                      Token price(in cUSD):
                    </div>
                    <div className="flex flex-row sm:flex-row-reverse lg:flex-row xl:flex-row-reverse w-full sm:w-1/2 lg:w-full xl:w-1/2 text-app-dark-400">
                      ${investments[investments.length - 1][3]}
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
                      {getDate(investments[investments.length - 1][4])}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `/lands/${investments[investments.length - 1][0]}`
                      )
                    }
                    className="rounded-full h-12 px-4 py-2 border border-main text-white w-40 hoverable-btn"
                  >
                    Explore Land
                  </button>
                </div>
              )}
              {checkingBalances ? (
                <div className="flex flex-col w-full lg:w-1/2 2xl:w-2/5 bg-token-detail lg:mx-8 mr-6 md:mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 rounded-3xl px-4 md:px-8 xl:px-10 2xl:px-12 3xl:px-16 py-10 gap-10">
                  <DotLoader
                    color="rgba(91, 230, 202, 0.84)"
                    loading={checkingInvestments}
                    cssOverride={override}
                  />
                </div>
              ) : (
                <div className="flex flex-col w-full lg:w-1/2 2xl:w-2/5 bg-token-detail lg:mx-8 mr-6 md:mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 rounded-3xl px-4 md:px-8 xl:px-10 2xl:px-12 3xl:px-16 py-10 gap-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-white text-sm">Native Balances</div>
                    {/* <div className="text-white text-sm">{balances.address}</div> */}
                    <div className="text-app-dark-400">
                      Your approximated net balance is:
                    </div>
                    <div className="text-white text-md">
                      ${balances.nativeBalances.cUSDBalance}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div
                      className="flex lg:flex-col xl:flex-row gap-6"
                      data-aos="fade-left"
                      data-aos-duration="400"
                    >
                      <div className="hidden sm:flex-col lg:hidden xl:flex flex-col items-center justify-center px-5 py-5 bg-token-light rounded-3xl">
                        <img src={Wallet} alt="wallet" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-app-main-100">
                          Your current cUSD balance is:
                        </div>
                        <div className="text-white text-sm">
                          ${balances.nativeBalances.cUSDBalance}
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex lg:flex-col xl:flex-row gap-6"
                      data-aos="fade-left"
                      data-aos-duration="700"
                    >
                      <div className="hidden sm:flex-col lg:hidden xl:flex flex-col items-center justify-center px-5 py-5 bg-token-light rounded-3xl">
                        <img src={Wallet} alt="wallet" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-app-main-100">
                          Your current Celo balance is:
                        </div>
                        <div className="text-white text-sm">
                          ${balances.nativeBalances.celoBalance}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-md justify-center text-white items-center">
                    Land Tokens Balances
                  </div>
                  <div className="flex flex-col">
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
