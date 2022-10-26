import Layout from "../../layout";
import MarketplaceItem from "../../components/items/marketplaceitem";
import SideBar from "../../components/sidebar";
import Video from "../../assets/image/video.png";
import DotLoader from "react-spinners/DotLoader";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getPublishedNFTs } from "../../actions/NFT";
import { useLocation } from "react-router-dom";
import TreeSlider from "../../components/slider/TreeSlider";
import AnimalSlider from "../../components/slider/AnimalSlider";

const override = {
  margin: "0 auto",
  display: "block",
};

const responsive = [
  {
    breakpoint: 3000,
    settings: {
      slidesToShow: 4,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 1366,
    settings: {
      slidesToShow: 2,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
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

const Marketplace = () => {
  const dispatch = useDispatch();

  const { landsFirstFetch, gettingPublishedNFTs, publishedNFTs } = useSelector(
    (state) => state.NFT
  );

  useEffect(() => {
    // if all lands not fetched yet dispatch fetch action
    if (landsFirstFetch && gettingPublishedNFTs) {
      console.log("getting published lands...");
      dispatch(getPublishedNFTs());
    }
  }, []);

  return (
    <>
      <Layout title="Marketplace">
        <div className="flex gap-4 md:gap-8 lg:gap-12 xl:gap-16 min-h-screen w-full">
          <SideBar />
          <div className="flex flex-col pt-48 w-full md:w-4/5 xl:w-5/6 gap-8 pb-16 pr-4 sm:pr-8 md:pr-12 pl-4 sm:pl-8 md:pl-0 lg:pr-8 xl:pr-16">
            <div className="flex flex-col xl:flex-row gap-8 w-full min-h-1/2 xl:h-72">
              <div className="flex flex-col gap-6 bg-marketplace px-12 py-12 w-full rounded-4xl lg:mb-2 xl:mb-0">
                <div className="text-white">The Largest Lands Marketplace</div>
                <div className="text-white text-md">Available Lands</div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col gap-4 w-full lg:w-1/3">
                {gettingPublishedNFTs ? (
                  <DotLoader
                    color="rgba(91, 230, 202, 0.84)"
                    loading={gettingPublishedNFTs}
                    cssOverride={override}
                  />
                ) : (
                  <div>
                    {publishedNFTs.length > 0 ? (
                      <MarketplaceItem land={publishedNFTs[0]} />
                    ) : (
                      <p className="text-white">No lands available...</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4 w-full lg:w-2/3">
                <div className="flex flex-col bg-benefit py-8 px-2 md:px-4 lg:px-8 rounded-2xl gap-8">
                  <span className="text-app-main-100 text-lg">
                    Purchase today... Conserve for the future!
                  </span>
                  <span className="text-white text-md">
                    Become a patagonian landowner and look forward to:
                  </span>
                  <div className="flex border border-main rounded-3xl px-2 md:px-4 lg:px-8 py-6 gap-2 md:gap-4 lg:gap-8">
                    <div className="rounded-full bg-gradient text-white px-2 h-6">
                      1
                    </div>
                    <span className="text-white">
                      Ensure land conservation for 30 years.
                    </span>
                  </div>
                  <div className="flex border border-main rounded-3xl px-2 md:px-4 lg:px-8 py-6 gap-2 md:gap-4 lg:gap-8">
                    <div className="rounded-full bg-gradient text-white px-2 h-6">
                      2
                    </div>
                    <span className="text-white">
                      Protect and monitor some of the wildest trees and animals
                      in Patagonia!
                    </span>
                    {/* </div>
                  <span className="text-white">{"Trees >"}</span>
                  <TreeSlider responsive={responsive} />
                  <span className="text-white">{"Animals >"}</span>
                  <AnimalSlider responsive={responsive} /> */}
                  </div>
                  <div className="flex border border-main rounded-3xl px-2 md:px-4 lg:px-8 py-6 gap-2 md:gap-4 lg:gap-8">
                    <div className="rounded-full bg-gradient text-white px-2 h-6">
                      3
                    </div>
                    <span className="text-white">
                      Transparent legal ownership rights.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-white text-md">Featured Lands</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4">
              {publishedNFTs.map((publishedNFT, idx) => (
                <MarketplaceItem key={idx} land={publishedNFT} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Marketplace;
