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

const override = {
  margin: "0 auto",
  display: "block",
};

const Land = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { gettingNFT, NFT, publishedNFTs, NFTError, allNFTs } = useSelector(
    (state) => state.NFT
  );

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
    AOS.init({ once: true });
  }, []);

  const handleBuy = () => {
    dispatch(getNFTAction());
    navigate(`/lands/${NFT.tokenId}/buy`);
  };

  const handleSelection = (index) => {
    setSelected(NFT.species[index]);
  };

  return (
    <>
      <Layout title="Kolor | Land Details">
        <div className="flex gap-4 md:gap-8 lg:gap-12 xl:gap-16 bg-dashboard min-h-screen w-full">
          <SideBar />
          {gettingNFT ? (
            <div className="flex flex-col w-full pt-48 pb-16 gap-6 items-center justify-center pr-4 sm:pr-8 md:pr-12 pl-4 sm:pl-8 md:pl-12 lg:pr-8 xl:pr-16">
              <DotLoader
                color="rgba(91, 230, 202, 0.84)"
                loading={gettingNFT}
                cssOverride={override}
              />
            </div>
          ) : (
            <div className="flex flex-col w-full pt-48 pb-16 gap-6 items-center justify-center pr-4 sm:pr-8 md:pr-12 pl-4 sm:pl-8 md:pl-12 lg:pr-8 xl:pr-16">
              <div
                className="flex flex-col lg:flex-row bg-sidebar rounded-3xl px-4 md:px-8 lg:px-12 xl:px-16 py-16 gap-8"
                data-aos="zoom-in"
                data-aos-duration="700"
              >
                <div className="flex flex-col gap-4 w-full lg:w-1/4">
                  <img src={Map} alt="map" className="" />
                  <div className="text-white text-sm">{NFT.name}</div>
                  <button className="text-white py-1 rounded-full border border-main w-48">
                    Contact
                  </button>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="text-app-dark-400 text-sm">Land details</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="text-white">
                        This land originially belonged to{" "}
                        <span className="text-green">{NFT.landOwnerAlias}</span>
                        , who has provided it to{" "}
                        <span className="text-green">Kolor</span> for
                        conservation since{" "}
                        <span className="text-green">
                          {getDate(NFT.creationDate)}
                        </span>
                      </div>
                    </div>
                    <div className="text-white">
                      Located in{" "}
                      <span className="text-green">
                        {NFT.city}, {NFT.stateOrRegion}, {NFT.country}.
                      </span>{" "}
                      It has a total size of{" "}
                      <span className="text-green">
                        {NFT.size} {NFT.unit}.
                      </span>
                    </div>
                    {/* <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex text-white">
                        Estimated Initial TCO2 projected per year:
                      </div>
                      <div className="flex text-app-main-100">
                        {NFT.initialTCO2perYear}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex text-white">
                        Estimated Current TCO2 projected per year:
                      </div>
                      <div className="flex text-app-main-100">
                        {NFT.VCUInfo.projectedVCUS}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex text-white">
                        TCO2 sold from this land:
                      </div>
                      <div className="flex text-app-main-100">
                        {NFT.soldTCO2}
                      </div>
                    </div> */}
                  </div>
                  {/* <div
                    className="flex bg-gradient px-6 py-6 cursor-pointer text-white rounded-3xl"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    This land has emitted{" "}
                    {roundValue(NFT.VCUInfo.emittedVCUs, 2)} TCO2 and has a
                    remaining of {roundValue(NFT.VCUInfo.VCUsLeft, 2)} TCO2 to
                    sell.
                  </div> */}
                </div>
              </div>
              <div className="text-app-dark-400 text-sm">
                Start protecting Patagonia with just a few clicks!
              </div>
              <div className="flex flex-col md:flex-row gap-4 lg:px-12 w-full">
                <button
                  className="w-full flex items-center justify-center text-white rounded-2xl py-4 border border-main hoverable-btn"
                  onClick={handleBuy}
                  data-aos="fade-right"
                  data-aos-duration="400"
                >
                  Land Tokens available
                </button>
                <button
                  className="w-full flex button-gradient items-center justify-center text-white rounded-2xl py-4"
                  data-aos="fade-left"
                  data-aos-duration="700"
                  disabled
                >
                  Let's Kolor Soon!
                </button>
              </div>
              <div className="flex flex-col w-full lg:flex-row gap-8 border border-main rounded-2xl px-4 md:px-8 lg:px-10 xl:px-12 py-12">
                {NFT.species.length > 0 ? (
                  <div className="flex flex-col w-full lg:w-1/2 gap-4 text-white">
                    <div className="text-white py-6">
                      Select species to see its details
                    </div>
                    {NFT.species.map((species, idx) => (
                      <SpeciesItem
                        key={idx}
                        species={species}
                        index={idx}
                        selected={selected}
                        handleSelection={handleSelection}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col w-full lg:w-1/2 gap-4 text-white">
                    No species added yet...
                  </div>
                )}

                {Object.keys(selected).length > 0 ? (
                  <div className="flex flex-col w-full lg:w-1/2 gap-4">
                    <div className="text-white py-8">Specie Info</div>
                    <div className="flex gap-3">
                      <div className="text-white">Specie:</div>
                      <div className="text-app-main-100">
                        {selected.speciesAlias}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-white">Scientific Name:</div>
                      <div className="text-app-main-100">
                        {selected.scientificName}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-white">Density:</div>
                      <div className="text-app-main-100">
                        {normalizeNumber(
                          selected.density,
                          selected.decimals * -1
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-white">
                        TCO2 projected from specie per year:
                      </div>
                      <div className="text-app-main-100">
                        {normalizeNumber(
                          selected.TCO2perYear,
                          selected.decimals * -1
                        )}
                      </div>
                    </div>
                    {/* <div className="flex gap-3">
                    <div className="text-white">TCO2 offset per second:</div>
                    <div className="text-app-main-100">
                      {normalizeNumber(
                        selected.TCO2perSecond,
                        selected.decimals * -1
                      )}
                    </div>
                  </div> */}
                    <div className="flex gap-3">
                      <div className="text-white">Added on:</div>
                      <div className="text-app-main-100">
                        {getDate(selected.creationDate)}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-white">Last update on:</div>
                      <div className="text-app-main-100">
                        {selected.updateDate != 0
                          ? getDate(selected.updateDate)
                          : "No updates yet..."}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full lg:w-1/2 gap-4">
                    {" "}
                    <div className="text-white py-8">Specie Info</div>
                    <div className="flex gap-3">
                      <div className="text-white">
                        Select a specie from left to see its details...
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Land;
