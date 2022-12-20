import Layout from "../../../layout/web2";
import SideBar from "../../../components/sidebar/web2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Map } from "../../../components/map";
import { getAssetsBalances } from "../../../store/slices/token/thunks";
import { getNFT, setNFT } from "../../../store/slices/NFT";

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

  const { gettingNFT, NFT, publishedNFTs } = useSelector((state) => state.NFT);
  const { balances, gettingBalances } = useSelector((state) => state.token);

  useEffect(() => {
    if (!NFT) {
      if (publishedNFTs) {
        const foundNFT = publishedNFTs.find(({ tokenId }) => tokenId === id);

        if (foundNFT) {
          setNFT(foundNFT);
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

  const handleBuy = () => {
    navigate(`/lands/${NFT.tokenId}/buy`);
  };

  return (
    <>
      <Layout title="Kolor | Land Details">
        <div className="flex gap-4 md:gap-8 lg:gap-12 xl:gap-16 min-h-screen w-full">
          <SideBar />
          <div className="flex flex-col xl:flex-row pt-48 w-full md:w-4/5 xl:w-5/6 gap-8 pb-16 pr-4 sm:pr-8 md:pr-12 pl-4 sm:pl-8 md:pl-0 lg:pr-8 xl:pr-16">
            <div className="flex flex-col w-full xl:w-1/2 gap-6">
              {gettingNFT || gettingBalances ? (
                <DotLoader
                  color="rgba(91, 230, 202, 0.84)"
                  loading={gettingNFT}
                  cssOverride={override}
                />
              ) : (
                <Map land={NFT} />
              )}

              <div className="flex flex-col gap-2"></div>
            </div>
            <div className="flex flex-col w-full xl:w-1/2 gap-6">
              <div className="border border-main rounded-2xl px-4 py-6">
                {gettingNFT || gettingBalances ? (
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
              <div className="flex flex-col gap-4 tiny:flex-row tiny:gap-0">
                {gettingNFT || gettingBalances ? (
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
                      className="py-2 px-16 button-gradient text-white text-sm rounded-full hover:border-1 hover:border-white"
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Land;
