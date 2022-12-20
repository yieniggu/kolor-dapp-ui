import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Wallet from "../../assets/image/wallet.png";
import DotLoader from "react-spinners/DotLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import { getPublishedNFTs } from "../../store/slices/NFT";

const override = {
  margin: "0 auto",
  display: "block",
};

export const LandTokenBalanceItem = ({ landTokenBalance, index }) => {
  const { landsFirstFetch, gettingPublishedNFTs, publishedNFTs } = useSelector(
    (state) => state.NFT
  );

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    // if all lands not fetched yet dispatch fetch action
    if (landsFirstFetch && gettingPublishedNFTs) {
      dispatch(getPublishedNFTs());
    }
  }, []);

  return (
    <>
      {gettingPublishedNFTs ? (
        <DotLoader
          color="rgba(91, 230, 202, 0.84)"
          loading={gettingPublishedNFTs}
          cssOverride={override}
        />
      ) : (
        <div
          className="flex lg:flex-col xl:flex-row gap-6"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <div className="hidden sm:flex-col lg:hidden xl:flex xl:h-10 xl:my-auto flex-col items-center justify-center px-5 py-5 bg-token-light rounded-3xl">
            <img src={Wallet} alt="wallet" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-white text-sm">
              {landTokenBalance} token{landTokenBalance > 1 && "s"}
            </div>
            <div className="flex gap-2">
              <div className="text-white">From</div>
              <div className="text-app-dark-400 underline">
                <Link to={`/lands/${index}/buy`}>
                  <a> {publishedNFTs[index].name}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
