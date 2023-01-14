import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AOS from "aos";
import SideBar from "../../../../components/sidebar/web3";
import Layout from "../../../../layout/web3";
import LogoIcon from "../../../../assets/logo/logo_icon.png";
import { DotLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { Proposals } from "./proposals";
import { NewProposal } from "./newProposal";
import {
  getAssetsBalancesFromWallet,
  getInvestmentsFromWallet,
} from "../../../../store/slices/token/thunks";
import { getPublishedNFTs } from "../../../../store/slices/NFT";
import { useAccount, useNetwork } from "wagmi";
import { isValidNetwork } from "../../../../utils/web3";

const override = {
  margin: "0 auto",
  display: "block",
};

export const DaoCommunity = () => {
  const { balances, gettingBalances, checkingInvestments, investments } =
    useSelector((state) => state.token);

  const { landsFirstFetch, gettingPublishedNFTs, publishedNFTs } = useSelector(
    (state) => state.NFT
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const [token, setToken] = useState(null);
  const [selected, setSelected] = useState("proposals");

  useEffect(() => {
    if (publishedNFTs) {
      const found = publishedNFTs.find((NFT) => NFT.identifier === id);

      setToken(found);
    }
  }, [publishedNFTs]);

  useEffect(() => {
    if (!investments && !checkingInvestments) {
      dispatch(getInvestmentsFromWallet(address));
    }
  }, [address]);

  useEffect(() => {
    // if all lands not fetched yet dispatch fetch action
    if (landsFirstFetch && gettingPublishedNFTs) {
      console.log("getting published lands...");
      dispatch(getPublishedNFTs());
    }
  }, []);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!balances) {
      dispatch(getAssetsBalancesFromWallet(address));
    }
  }, [address]);

  useEffect(() => {
    console.log("address: ", address, isConnected, chain);
    (!address || !isConnected || !isValidNetwork(chain.id)) &&
      navigate("/signin");
  }, [address, chain]);

  const select = ({ target }) => {
    setSelected(target.getAttribute("name"));
  };

  return (
    <Layout title="Marketplace">
      <div className="flex gap-4 md:gap-8 lg:gap-12 xl:gap-16 min-h-screen w-full">
        <SideBar />
        <div className="flex flex-row pt-48 w-full gap-8 pb-16 pr-4 sm:pr-8 md:pr-12 pl-4 sm:pl-8 md:pl-0 lg:pr-8 xl:pr-16 overflow-y-auto">
          {gettingPublishedNFTs || !token ? (
            <DotLoader
              color="rgba(91, 230, 202, 0.84)"
              loading={gettingPublishedNFTs}
              cssOverride={override}
            />
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 grow-0 w-full">
              <div
                className={`flex flex-col h-full bg-gray-600 rounded-2xl bg-opacity-75 py-6 px-2 lg:w-3/5 3xl:w-1/6 grow-0 ${
                  selected === "proposals"
                    ? "3xl:w-[420px] 2xl:w-[562px]"
                    : "md:w-[502px] xl:w-[316px]"
                }`}
              >
                <img className="w-20 mx-auto" src={LogoIcon}></img>
                <h1 className="text-center mx-auto text-white text-md font-sans mt-6">
                  {token.name}
                </h1>
                <h2 className="text-gray-500 text-center font-sans">
                  {token.landTokenInfo.totalHolders} member
                  {token.landTokenInfo.totalHolders > 1 && "s"}
                </h2>
                <div className="text-justify text-sm ml-4 mt-10 text-white">
                  <h4
                    name="proposals"
                    className={`mb-5 px-4 cursor-pointer ${
                      selected === "proposals" && "border-l-4"
                    }`}
                    onClick={select}
                  >
                    Proposals
                  </h4>
                  <h4
                    name="new"
                    className={`px-4 cursor-pointer ${
                      selected === "new" && "border-l-4"
                    }`}
                    onClick={select}
                  >
                    New Proposal
                  </h4>
                </div>
              </div>
              {selected === "proposals" && !gettingPublishedNFTs && token && (
                <Proposals />
              )}
              {selected === "new" && !gettingPublishedNFTs && token && (
                <NewProposal tokenId={token.tokenId} />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
