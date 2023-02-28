import { useEffect, useState } from "react";
import Layout from "../../../layout/web2";
import SideBar from "../../../components/sidebar/web2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import DotLoader from "react-spinners/DotLoader";
import AOS from "aos";
import "aos/dist/aos.css";

import { AppModal } from "../../../components/modal/web2";
import { Map } from "../../../components/map";
import { getNFT, setGettingNFT, setNFT } from "../../../store/slices/NFT";
import {
  acquireLandTokens,
  getAssetsBalances,
} from "../../../store/slices/token/thunks";

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
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    if (!balances) {
      dispatch(getAssetsBalances());
    }
  }, []);

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

  const handleBuy = () => {
    dispatch(acquireLandTokens(NFT.tokenId, tokensToBuy, uid, NFT.unit));
  };

  const handleNavigate = () => {
    navigate("/wallet");
  };

  return (
    <>
      <AppModal />
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
                {/* <div className="flex flex-col w-full border border-main rounded-3xl gap-4 px-4 py-4">
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
                  <div className="text-app-dark-400 text-md">Land details</div>
                  <div className="text-white text-sm">
                    The <span className="text-app-main-100">{NFT.name}</span>{" "}
                    land located in{" "}
                    <span className="text-app-main-100">
                      {NFT.city}, {NFT.stateOrRegion}, {NFT.country}
                    </span>{" "}
                    originally belonged to{" "}
                    <span className="text-app-main-100">
                      {NFT.landOwnerAlias}
                    </span>{" "}
                    and belongs to
                    <span className="text-app-main-100">
                      {" "}
                      Kolor since {getDate(NFT.creationDate)}.
                    </span>{" "}
                    With a total size of{" "}
                    <span className="text-app-main-100">
                      {NFT.size} {NFT.unit}
                    </span>{" "}
                    is one of the featured lands in Kolor marketplace.
                  </div>
                  <div className="flex gap-4 justify-center">
                    <div className="text-app-main-100 text-md">
                      Conserve it now!
                    </div>
                  </div>
                </div> */}
                {/* <div className="flex flex-col bg-contact py-24 px-6 xl:px-12 gap-6 rounded-4xl">
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
                </div> */}
              </div>
              {balances ? (
                <div
                  className="flex flex-col w-full md:w-5/12 lg:w-8/12 xl:w-6/12  gap-6 pr-8 xl:pr-12"
                  data-aos="zoom-in-left"
                  data-aos-duration="400"
                >
                  <div className="border border-gray-600 rounded-2xl px-4 py-6">
                    {gettingNFT ? (
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
                          {Object.keys(balances).length > 0
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
                        <button
                          onClick={handleBuy}
                          className={`mx-6 rounded-xl text-white font-sans text-md mt-10 py-4 opacity-75  ${
                            tokensToBuy * NFT.landTokenInfo.tokenPrice >
                            balances.nativeBalances.cUSDBalance
                              ? "bg-red-500"
                              : "bg-interaction hover:opacity-100"
                          }`}
                          disabled={
                            buying ||
                            tokensToBuy * NFT.landTokenInfo.tokenPrice >
                              balances.nativeBalances.cUSDBalance
                          }
                        >
                          {buying ? (
                            <p className="animate-ping">Loading...</p>
                          ) : tokensToBuy * NFT.landTokenInfo.tokenPrice >
                            balances.nativeBalances.cUSDBalance ? (
                            "NOT ENOUGH BALANCE"
                          ) : (
                            "BUY"
                          )}
                        </button>
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
