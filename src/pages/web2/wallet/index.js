import { useEffect, useState } from "react";
import Layout from "../../../layout/web2";
import ProgressBar from "../../../components/progressbar";
import SideBar from "../../../components/sidebar/web2";
import Copy from "../../../assets/icons/ico_copy.svg";
import Tick from "../../../assets/icons/ico_tick.svg";
import Speaker from "../../../assets/image/speaker.png";
import OutlineWallet from "../../../assets/image/outlined_wallet.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import "aos/dist/aos.css";
import { getAssetsBalances } from "../../../store/slices/token/thunks";

const override = {
  margin: "0 auto",
  display: "block",
};

const Wallet = () => {
  const { balances, gettingBalances } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!balances) {
      dispatch(getAssetsBalances());
    }
  }, []);

  const copyClipboard = () => {
    navigator.clipboard.writeText(balances.address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const reloadFunds = () => {
    dispatch(getAssetsBalances());
    navigate("/dashboard");
  };

  return (
    <Layout title="Marketplace">
      <div className="flex gap-4 md:gap-8 lg:gap-12 xl:gap-16 min-h-screen w-full">
        <SideBar />
        <div className="flex flex-col xl:flex-row pt-48 w-full md:w-4/5 xl:w-5/6 gap-8 pb-16 pr-4 sm:pr-8 md:pr-12 pl-4 sm:pl-8 md:pl-0 lg:pr-8 xl:pr-16">
          <div className="flex flex-col w-full xl:w-1/3 gap-6">
            <div className="flex gap-2 border border-main rounded-2xl px-4 py-6">
              <img src={Speaker} className="px-6 mt-2 w-16 h-4" alt="speaker" />
              <span className="text-app-main-100">
                First thing first. You need to add cash to your Kolor wallet.
              </span>
            </div>
            <div className="flex gap-6 border border-main rounded-2xl px-4 py-6">
              <div className="rounded-full border border-main text-app-main-100 h-11 w-11 items-center px-4 py-2">
                A
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-start w-full">
                  <span className="text-white text-sm">1 Acre = 100 $cUSD</span>
                </div>
                <span className="text-app-red">
                  *Make sure to add some extra cUSD for gas fee
                </span>
              </div>
            </div>
            {gettingBalances ? (
              <DotLoader
                color="rgba(91, 230, 202, 0.84)"
                loading={gettingBalances}
                cssOverride={override}
              />
            ) : (
              <div className="flex flex-col px-6 py-6 gap-4 bg-grey rounded-3xl">
                <div
                  className="flex w-full justify-between"
                  data-aos="fade-left"
                  data-aos-duration="500"
                >
                  <span className="text-white">Address</span>
                  <button onClick={() => copyClipboard()}>
                    {copied ? (
                      <img src={Tick} alt="tick" />
                    ) : (
                      <img src={Copy} alt="copy" />
                    )}
                  </button>
                </div>
                <p
                  className="truncate text-white"
                  data-aos="fade-left"
                  data-aos-duration="700"
                >
                  {balances.address}
                </p>
              </div>
            )}

            <button
              className="text-white button-gradient px-6 py-2 rounded-3xl"
              onClick={reloadFunds}
            >
              Done!
            </button>
          </div>
          <div className="flex flex-col w-full xl:w-2/3 gap-6">
            {/* <img src={CostaMap} alt="costa_map" className="rounded-2xl" /> */}
            {gettingBalances ? (
              <DotLoader
                color="rgba(91, 230, 202, 0.84)"
                loading={gettingBalances}
                cssOverride={override}
              />
            ) : (
              <div
                className="flex flex-col gap-4 border border-main rounded-3xl py-4 px-6"
                data-aos="zoom-in-right"
                data-aos-duration="500"
              >
                <div className="flex gap-4">
                  <img
                    src={OutlineWallet}
                    className="h-12 my-auto"
                    alt="outline-wallet"
                  />

                  <div className="flex flex-col">
                    <span className="text-white">
                      Current balance in your wallet:
                    </span>
                    <span className="text-app-main-100 text-sm">
                      {balances.nativeBalances.cUSDBalance} $cUSD
                    </span>
                  </div>
                </div>

                <ProgressBar
                  bgcolor="#00A78D"
                  completed={(balances.nativeBalances.cUSDBalance / 100) * 100}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wallet;
