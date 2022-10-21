import { useEffect, useState } from "react";
import Layout from "../../layout";
import SideBar from "../../components/sidebar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  finishGetNFTAction,
  getNFT,
  getNFTAction,
  NFTErrorFalseAction,
} from "../../actions/NFT";

import { acquireLandTokens, getAssetsBalances } from "../../actions/token";
import { getDate, roundValue } from "../../utils/web3Utils";
import DotLoader from "react-spinners/DotLoader";
import AOS from "aos";
import "aos/dist/aos.css";

import Placeholder from "../../assets/image/placeholder.png";
import { Modal } from "../../components/modal";

const costa = require("../../assets/image/costa.jpg");
const parque = require("../../assets/image/parque.jpg");

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
  const { id } = useParams();

  const dispatch = useDispatch();
  const { gettingNFT, publishedNFTs, NFT, NFTError, allNFTs } = useSelector(
    (state) => state.NFT
  );

  const { balances, buying } = useSelector((state) => state.token);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getNFTAction());
    if (Object.keys(NFT).length === 0) {
      console.log("go");
      if (allNFTs.length > 0) {
        dispatch(finishGetNFTAction(allNFTs[id]));
        dispatch(NFTErrorFalseAction());
      } else {
        console.log("getting nft");
        dispatch(getNFT(id));
      }
      console.log(NFTError);
    } else {
      const foundNFT = publishedNFTs.find((NFT) => NFT.tokenId == id);
      //   console.log("found nft: ", foundNFT);
      if (!foundNFT) {
        // console.log("not found nft");
        dispatch(getNFT(id));
      } else {
        dispatch(finishGetNFTAction(foundNFT));
        dispatch(NFTErrorFalseAction());
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(balances).length === 0) {
      dispatch(getAssetsBalances());
    }
  }, []);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const [tokensToBuy, setTokensToBuy] = useState("1");

  const handleChanged = (e) => {
    +e.target.value < +NFT.landTokenInfo.available
      ? setTokensToBuy(e.target.value)
      : setTokensToBuy(NFT.landTokenInfo.available);

    console.log("tokens to buy: ", tokensToBuy);
  };

  const handleBuy = () => {
    dispatch(acquireLandTokens(NFT.tokenId, tokensToBuy, uid, NFT.unit));
  };

  return (
    <>
      <Modal />
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
                <div className="flex flex-col w-full border border-main rounded-3xl gap-4 px-4 py-4">
                  <div className="xl:w-1/3 p-2">
                    <Slider {...settings}>
                      <img
                        src={Placeholder}
                        alt="placeholder"
                        className="w-48"
                      />
                      <img src={costa} alt="costa" className="w-48" />
                      <img src={parque} alt="parque" className="w-48" />
                    </Slider>
                  </div>
                  <div className="text-app-dark-400 text-sm">Land details</div>
                  <div className="flex gap-4">
                    <div className="text-white">Land Owner:</div>
                    <div className="text-app-main-100">
                      {NFT.landOwnerAlias}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">Land Owner Address:</div>
                    <div className="text-app-main-100 truncate">
                      {NFT.landOwner}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">Country:</div>
                    <div className="text-app-main-100">{NFT.country}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">State or region:</div>
                    <div className="text-app-main-100">{NFT.stateOrRegion}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">City:</div>
                    <div className="text-app-main-100">{NFT.city}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">Size ({NFT.unit}):</div>
                    <div className="text-app-main-100">{NFT.size} m2</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">
                      Estimated Initial TCO2 projected per year:
                    </div>
                    <div className="text-app-main-100">
                      {NFT.initialTCO2perYear}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">
                      Estimated Current TCO2 projected per year:
                    </div>
                    <div className="text-app-main-100">
                      {roundValue(NFT.VCUInfo.projectedVCUS, 2)}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">TCO2 sold from this land:</div>
                    <div className="text-app-main-100">{NFT.soldTCO2}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-white">This land was created on:</div>
                    <div className="text-app-main-100">
                      {getDate(NFT.creationDate)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-contact py-24 px-6 xl:px-12 gap-6 rounded-4xl">
                  <div className="text-white text-sm">Looking to invest?</div>
                  <div className="text-white">
                    Suscribe now and start protecting Patagonia!
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-6">
                    <input
                      type="text"
                      placeholder="Email Address"
                      className="w-full sm:w-2/3 md:w-full xl:w-2/3 input-contact py-4 px-4 rounded-3xl"
                    />
                    <button className="bg-white rounded-3xl px-8 py-4">
                      Suscribe
                    </button>
                  </div>
                </div>
              </div>
              {Object.keys(balances).length > 0 ? (
                <div
                  className="flex flex-col w-full md:w-5/12 lg:w-6/12 xl:w-4/12  gap-6 pr-8 xl:pr-12"
                  data-aos="zoom-in-left"
                  data-aos-duration="400"
                >
                  <div className="text-sm text-white">
                    {Object.keys(balances).length > 0
                      ? balances.landTokenBalances[NFT.tokenId] > 0
                        ? "You're part of this land!"
                        : "Be part of this land too!"
                      : "Be part of this land too!"}
                  </div>
                  <div className="text-app-dark-400">
                    This land had an initial offering of{" "}
                    {NFT.landTokenInfo.initialAmount} land tokens. Currently
                    there's a total of {NFT.landTokenInfo.available}/
                    {NFT.landTokenInfo.currentAmount} tokens available.
                  </div>
                  <div className="flex flex-col py-4 gap-4 items-center justify-center">
                    <p>
                      {balances.nativeBalances.cUSDBalance <
                        tokensToBuy * NFT.landTokenInfo.tokenPrice || buying}
                    </p>

                    <div className="flex gap-4 h-10">
                      {balances.nativeBalances.cUSDBalance >=
                        tokensToBuy * NFT.landTokenInfo.tokenPrice && (
                        <div
                          onClick={handleBuy}
                          className={`flex justify-center items-center cursor-pointer border border-main rounded-lg text-white px-4 h-10  ${
                            balances.nativeBalances.cUSDBalance <
                              tokensToBuy * NFT.landTokenInfo.tokenPrice ||
                            (buying ? "disabled-btn" : "hoverable-btn")
                          }`}
                          disabled={
                            balances.nativeBalances.cUSDBalance <
                              tokensToBuy * NFT.landTokenInfo.tokenPrice ||
                            buying
                          }
                        >
                          Buy
                        </div>
                      )}

                      <div className="flex justify-center w-full bg-gradient rounded-lg h-10">
                        <input
                          type="number"
                          min={1}
                          value={tokensToBuy}
                          className="w-full items-center input-value"
                          onChange={(e) => handleChanged(e)}
                        />
                      </div>
                    </div>
                    <div className="text-app-dark-400">
                      Land token at a price of{" "}
                      <span className="text-white">
                        {NFT.landTokenInfo.tokenPrice} $cUSD
                      </span>
                    </div>

                    {balances.nativeBalances.cUSDBalance <
                    tokensToBuy * NFT.landTokenInfo.tokenPrice ? (
                      <div className="text-app-dark-400">
                        <p className="text-center text-app-red">
                          Not enough funds!
                        </p>
                        <button className="border border-main rounded-full text-white py-2 px-6 mt-2 hoverable-btn">
                          Deposit now over CELO network!
                        </button>
                        <p className="text-center"></p>
                      </div>
                    ) : (
                      <p></p>
                    )}

                    <div className="text-app-dark-400">
                      {NFT.landTokenInfo.sold /
                        NFT.landTokenInfo.currentAmount <
                        0.25 && (
                        <p>
                          Looks like you're early. Get your land tokens now
                          {NFT.landTokenInfo.totalHolders > 0 &&
                            ` and join other ${NFT.landTokenInfo.totalHolders} holders`}
                          !
                        </p>
                      )}
                      {NFT.landTokenInfo.sold /
                        NFT.landTokenInfo.currentAmount <
                        0.75 &&
                        NFT.landTokenInfo.sold /
                          NFT.landTokenInfo.currentAmount >
                          0.25 && (
                          <p>
                            This land is at its peak point. Get your land tokens
                            now
                            {NFT.landTokenInfo.totalHolders > 0 &&
                              ` and join other ${NFT.landTokenInfo.totalHolders} holders`}
                            !
                          </p>
                        )}
                      {NFT.landTokenInfo.sold /
                        NFT.landTokenInfo.currentAmount >
                        0.75 && (
                        <p>
                          Hurry up, this land is selling out! Get your land
                          tokens now
                          {NFT.landTokenInfo.totalHolders > 0 &&
                            ` and join other ${NFT.landTokenInfo.totalHolders} holders`}
                          !
                        </p>
                      )}
                    </div>
                    <button
                      className="border border-main w-3/4 text-white py-2 "
                      disabled
                    >
                      {NFT.landTokenInfo.totalHolders === 0
                        ? "Be the first holder of this land!"
                        : `There are ${NFT.landTokenInfo.totalHolders} holders already!`}
                    </button>
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
