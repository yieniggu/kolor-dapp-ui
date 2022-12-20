import Layout from "../../../layout/web2";
import MarketplaceItem from "../../../components/items/marketplaceitem";
import SideBar from "../../../components/sidebar/web2";
import DotLoader from "react-spinners/DotLoader";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPublishedNFTs } from "../../../store/slices/NFT";

const override = {
  margin: "0 auto",
  display: "block",
};

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
          <div className="flex flex-col w-full md:w-4/5 xl:w-5/6 gap-8 pb-16 pr-4 sm:pr-8 md:pr-12 pl-4 sm:pl-8 md:pl-0 lg:pr-8 xl:pr-16">
            <div className="flex flex-col xl:flex-row gap-8 w-full grow mt-10">
              <div className="flex flex-col gap-6 bg-marketplace px-12 py-12 w-full rounded-xl lg:w-3/5 lg:mb-2 xl:mb-0">
                <div className="text-white">The Largest Lands Marketplace</div>
                <div className="text-white text-md">Available Lands</div>
              </div>
            </div>

            <h2 className="text-white text-md">Featured Lands</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4">
              {gettingPublishedNFTs ? (
                <DotLoader
                  color="rgba(91, 230, 202, 0.84)"
                  loading={gettingPublishedNFTs}
                  cssOverride={override}
                />
              ) : (
                publishedNFTs
                  .slice(4)
                  .map((publishedNFT, idx) => (
                    <MarketplaceItem key={idx} land={publishedNFT} />
                  ))
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Marketplace;
