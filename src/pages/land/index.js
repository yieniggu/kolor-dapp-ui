import Layout from "../../layout";
import SideBar from "../../components/sidebar";
import Map from "../../assets/image/map.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  finishGetNFTAction,
  getNFT,
  getNFTAction,
  NFTErrorFalseAction,
} from "../../actions/NFT";
import { getDate, normalizeNumber, roundValue } from "../../utils/web3Utils";
import DotLoader from "react-spinners/DotLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import { SpeciesItem } from "../../components/items/speciesitem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CostaMap from "../../assets/image/costa.jpg";
import OutlineWallet from "../../assets/image/outlined_wallet.png";
import ProgressBar from "../../components/progressbar";
import TreeSlider from "../../components/slider/TreeSlider";
import AnimalSlider from "../../components/slider/AnimalSlider";
import { getAssetsBalances } from "../../actions/token";

const override = {
  margin: "0 auto",
  display: "block",
};

const Land = () => {
  const responsive = [
    {
      breakpoint: 3000,
      settings: {
        slidesToShow: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { gettingNFT, NFT, publishedNFTs, NFTError, allNFTs } = useSelector(
    (state) => state.NFT
  );
  const { balances, checkingBalances } = useSelector((state) => state.token);

  const [selected, setSelected] = useState({});

  useEffect(() => {
    dispatch(getNFTAction());
    if (Object.keys(NFT).length === 0) {
      console.log("go");
      if (allNFTs.length > 0) {
        dispatch(finishGetNFTAction(allNFTs[id]));
        dispatch(NFTErrorFalseAction());
        if (Object.keys(NFT).length > 0 && NFT.species.length > 0) {
          setSelected(NFT.species[0]);
        }
      } else {
        console.log("getting nft");
        dispatch(getNFT(id));
        if (Object.keys(NFT).length > 0 && NFT.species.length > 0) {
          setSelected(NFT.species[0]);
        }
      }
      console.log(NFTError);
    } else {
      const foundNFT = publishedNFTs.find((NFT) => NFT.tokenId == id);
      //   console.log("found nft: ", foundNFT);
      if (!foundNFT) {
        // console.log("not found nft");
        dispatch(getNFT(id));
        if (Object.keys(NFT).length > 0 && NFT.species.length > 0) {
          setSelected(NFT.species[0]);
        }
      } else {
        dispatch(finishGetNFTAction(foundNFT));
        dispatch(NFTErrorFalseAction());
        if (Object.keys(NFT).length > 0 && NFT.species.length > 0) {
          setSelected(NFT.species[0]);
        }
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

  const handleBuy = () => {
    dispatch(getNFTAction());
    navigate(`/lands/${NFT.tokenId}/buy`);
  };

  return (
    <>
      <Layout title="Kolor | Land Details">
        <div className="flex gap-4 md:gap-8 lg:gap-12 xl:gap-16 min-h-screen w-full">
          <SideBar />
          <div className="flex flex-col xl:flex-row pt-48 w-full md:w-4/5 xl:w-5/6 gap-8 pb-16 pr-4 sm:pr-8 md:pr-12 pl-4 sm:pl-8 md:pl-0 lg:pr-8 xl:pr-16">
            <div className="flex flex-col w-full xl:w-1/2 gap-6">
              <img src={CostaMap} alt="costa_map" className="rounded-2xl" />
              <div className="flex flex-col gap-2">
                <span className="text-white">Price</span>
                <div className="flex flex-col gap-4 tiny:flex-row tiny:gap-0">
                  {gettingNFT ? (
                    <DotLoader
                      color="rgba(91, 230, 202, 0.84)"
                      loading={gettingNFT}
                      cssOverride={override}
                    />
                  ) : (
                    <div className="flex flex-row">
                      <div
                        className="text-white px-6 py-2 bg-common-gradient rounded-l-2xl text-sm"
                        data-aos="zoom-in-right"
                        data-aos-duration="600"
                      >
                        {NFT.landTokenInfo.tokenPrice} $cUSD
                      </div>
                      <button
                        className="py-2 px-16 button-gradient text-white text-sm rounded-full"
                        data-aos="fade-left"
                        data-aos-duration="400"
                        onClick={handleBuy}
                      >
                        Pay!
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 border border-main rounded-3xl py-4 px-6">
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
                    {checkingBalances ? (
                      <DotLoader
                        color="rgba(91, 230, 202, 0.84)"
                        loading={checkingBalances}
                        cssOverride={override}
                      />
                    ) : (
                      <span className="text-app-main-100 text-sm">
                        {balances.nativeBalances.cUSDBalance} $cUSD
                      </span>
                    )}
                  </div>
                </div>
                {checkingBalances ? (
                  ""
                ) : (
                  <ProgressBar
                    bgcolor="#00A78D"
                    completed={
                      balances.nativeBalances.cUSDBalance /
                        NFT.landTokenInfo.tokenPrice <
                      1
                        ? (balances.nativeBalances.cUSDBalance /
                            NFT.landTokenInfo.tokenPrice) *
                          100
                        : 100
                    }
                    data-aos="fade-right"
                    data-aos-duration="700"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col w-full xl:w-1/2 gap-6">
              <div className="border border-main rounded-2xl px-4 py-6">
                {gettingNFT ? (
                  <DotLoader
                    color="rgba(91, 230, 202, 0.84)"
                    loading={gettingNFT}
                    cssOverride={override}
                  />
                ) : (
                  <div>
                    <span className="text-app-main-100 text-md mr-3">
                      {NFT.size} {NFT.unit}
                    </span>
                    <span className="text-white">
                      of untouched wild land in northern Patagonia, where
                      deforestation reaches a 1% annual rate.
                    </span>
                  </div>
                )}
              </div>
              <div className="gap-2 border border-main rounded-2xl px-4 py-6">
                <span className="text-white">{"Trees >"}</span>
                <TreeSlider responsive={responsive} />
                <span className="text-white">{"Animals >"}</span>
                <AnimalSlider responsive={responsive} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Land;
