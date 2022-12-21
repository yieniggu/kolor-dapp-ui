import { useEffect, useState } from "react";
import Layout from "../../../layout/web3";
import SideBar from "../../../components/sidebar/web3";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import DotLoader from "react-spinners/DotLoader";
import AOS from "aos";
import "aos/dist/aos.css";

import { Map } from "../../../components/map";
import { getNFT, setGettingNFT, setNFT } from "../../../store/slices/NFT";
import {
  acquireLandTokensFromWallet,
  approveMarketplace,
  getAssetsBalancesFromWallet,
  getInvestmentsFromWallet,
  landTokensAcquired,
} from "../../../store/slices/token/thunks";
import { isValidNetwork } from "../../../utils/web3";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ERC20Abi } from "../../../helpers/abis/ERC20";
import { marketplaceAbi } from "../../../helpers/abis/marketplace";
import { useDebounce } from "../../../hooks/useDebounce";
import { BigNumber } from "ethers";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const override = {
  margin: "0 auto",
  display: "block",
};

const Buy = () => {
  const { gettingNFT, publishedNFTs, NFT, NFTError, allNFTs } = useSelector(
    (state) => state.NFT
  );

  const { balances, buying, gettingBalances, marketplaceAllowance } =
    useSelector((state) => state.token);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("address: ", address, isConnected, chain);
    (!address || !isConnected || !isValidNetwork(chain.id)) &&
      navigate("/signin");
  }, [address, chain]);

  useEffect(() => {
    if (!NFT) {
      if (publishedNFTs) {
        const foundNFT = publishedNFTs.find(({ tokenId }) => tokenId == id);

        if (foundNFT) {
          console.log(`found nft!`, foundNFT);
          dispatch(setNFT(foundNFT));
          dispatch(setGettingNFT(false));
        } else {
          dispatch(getNFT(id));
        }
      } else {
        dispatch(getNFT(id));
      }
    }
  }, [address]);

  useEffect(() => {
    if (!balances) {
      dispatch(getAssetsBalancesFromWallet(address));
    }
  }, [address]);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const [tokensToBuy, setTokensToBuy] = useState(0);

  const handleChanged = (e) => {
    +e.target.value < +NFT.landTokenInfo.available
      ? setTokensToBuy(e.target.value)
      : setTokensToBuy(NFT.landTokenInfo.available);

    console.log("tokens to buy: ", tokensToBuy);
  };

  const debouncedTokenId = useDebounce(id, 500);
  const debouncedAmount = useDebounce(tokensToBuy, 100);

  const { config: cUSDConfig } = usePrepareContractWrite({
    address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    abi: ERC20Abi,
    functionName: "approve",
    args: [
      "0x4e3e9AC6B6AD04f29e47cEDDA5067D12473108A7",
      BigNumber.from("43349837740420295665710040"),
    ],
  });

  const {
    data: approveData,
    isLoading: isApproving,
    write: approve,
  } = useContractWrite(cUSDConfig);

  const { config: marketplaceConfig } = usePrepareContractWrite({
    address: "0x4e3e9AC6B6AD04f29e47cEDDA5067D12473108A7",
    abi: marketplaceAbi,
    functionName: "buyLandTokens",
    args: [parseInt(debouncedTokenId), parseInt(debouncedAmount)],
  });

  let { isSuccess: approveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const {
    data: buyData,
    isLoading: isBuying,
    write: buy,
  } = useContractWrite(marketplaceConfig);

  const handleBuy = () => {
    if (marketplaceAllowance > 0) {
      // console.log("marketplaceAllowance > 0: ", marketplaceAllowance);
      buy?.();
    } else {
      // console.log("marketplaceAllowance <= 0: ", marketplaceAllowance);
      approve?.();
    }
  };

  let { isSuccess: buySuccess } = useWaitForTransaction({
    hash: buyData?.hash,
  });

  useEffect(() => {
    console.log(
      "approveSuccess: ",
      approveSuccess,
      " - buySuccess: ",
      buySuccess
    );

    console.log("buy Data: ", buyData);

    if (approveSuccess || buySuccess) {
      buySuccess &&
        dispatch(landTokensAcquired(tokensToBuy, NFT.unit, buyData?.hash));
      dispatch(getNFT(id));
      dispatch(getAssetsBalancesFromWallet(address));
      dispatch(getInvestmentsFromWallet(address));

      approveSuccess = false;
      buySuccess = false;
    }
  }, [approveSuccess, buySuccess]);

  return (
    <>
      <Layout title="Kolor | Buy LandTokens">
        <div className="flex gap-8 lg:gap-12 xl:gap-16 bg-dashboard min-h-screen w-full">
          <SideBar />
          {gettingNFT ? (
            <div className="flex flex-col-reverse md:flex-row pt-48 w-full px-4 md:px-0 gap-6 xl:gap-8 pb-16">
              <DotLoader
                color="rgba(91, 230, 202, 0.84)"
                loading={gettingNFT}
                cssOverride={override}
              />
            </div>
          ) : (
            <div className="flex flex-col-reverse md:flex-row pt-48 w-full px-4 md:px-0 gap-6 xl:gap-8 pb-16">
              <div
                className="flex flex-col w-full md:w-1/3 xl:w-1/2 gap-12"
                data-aos="zoom-in"
                data-aos-duration="500"
              >
                <Map land={NFT} />
              </div>
              {balances ? (
                <div
                  className="flex flex-col w-full md:w-5/12 lg:w-8/12 xl:w-6/12  gap-6 pr-8 xl:pr-12"
                  data-aos="zoom-in-left"
                  data-aos-duration="400"
                >
                  <div className="border border-gray-600 rounded-2xl px-4 py-6">
                    {gettingNFT || gettingBalances ? (
                      <DotLoader
                        color="rgba(91, 230, 202, 0.84)"
                        loading={gettingNFT}
                        cssOverride={override}
                      />
                    ) : (
                      <div className="flex flex-col py-10 pb-20">
                        <h2 className="text-center font-sans text-gray-500">
                          PRICE
                        </h2>
                        <div className="flex flex-row justify-center gap-2">
                          <i className="rounded-full border-2 border-white p-1 px-2 my-auto fa-solid fa-dollar-sign text-white"></i>
                          <h1 className="text-md font-sans font-medium text-white">
                            {NFT.landTokenInfo.tokenPrice} cUSD
                          </h1>
                        </div>
                        <div className="rounded-xl border border-gray-600 bg-black mt-8 mx-6">
                          <p className="text-gray-500 font-sans p-4 text-sm text-justify">
                            {NFT.size} acres of untouched wild land in northern
                            Patagonia, where deforestation reaches a 1% annual
                            rate.
                          </p>
                        </div>
                        <h2 className="text-center mt-10 font-sans font-medium text-white text-md">
                          {balances
                            ? balances.landTokenBalances[NFT.tokenId] > 0
                              ? "You're part of this land!"
                              : "Be part of this land too!"
                            : "Be part of this land too!"}
                        </h2>
                        <div className="flex flex-row justify-center gap-2 mt-4 mx-6 grow">
                          <div className="rounded-xl bg-gray-900 text-gray-800 p-2 grow w-3/5">
                            <h1 className="text-center font-medium text-md grow p-2">
                              {NFT.landTokenInfo.available} tokens available
                            </h1>
                          </div>
                          <input
                            className="rounded-xl bg-gray-900 bg-opacity-80 text-gray-800 text-center font-medium text-md w-1/5 grow-0 input-value focus:text-white"
                            type="number"
                            min={1}
                            value={tokensToBuy}
                            onChange={(e) => handleChanged(e)}
                          ></input>
                        </div>
                        {tokensToBuy * NFT.landTokenInfo.tokenPrice <=
                        balances.nativeBalances.cUSDBalance ? (
                          <button
                            onClick={handleBuy}
                            className="mx-6 bg-interaction rounded-xl text-white font-sans text-md mt-10 py-4 opacity-75 hover:opacity-100"
                            disabled={isApproving || isBuying}
                          >
                            {isApproving || isBuying ? (
                              <p className="animate-ping">Loading...</p>
                            ) : marketplaceAllowance &&
                              marketplaceAllowance > 0 ? (
                              "BUY"
                            ) : (
                              "APPROVE"
                            )}
                          </button>
                        ) : (
                          <div className="text-center text-sm">
                            <p className="text-red-400">Not enough Balance!</p>
                            <p className="text-app-main-100 hover:text-opacity-75">
                              <Link to={"/wallet"}>
                                Deposit now over Celo network!
                              </Link>
                            </p>
                          </div>
                        )}

                        <p className="text-center text-gray-500 mt-2 text-xs font-sans text-opacity-75">
                          Land token at a price of{" "}
                          {NFT.landTokenInfo.tokenPrice} $cUSD
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <h1>""</h1>
              )}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Buy;
