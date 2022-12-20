import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import { DaoItem } from "../../../../components/items/daoItem";
import { DotLoader } from "react-spinners";
import {
  getAssetsBalancesFromWallet,
  getInvestmentsFromWallet,
} from "../../../../store/slices/token/thunks";
import { getPublishedNFTs } from "../../../../store/slices/NFT";

const override = {
  margin: "0 auto",
  display: "block",
};

export const Dao = () => {
  const { balances, gettingBalances, checkingInvestments, investments } =
    useSelector((state) => state.token);

  const { landsFirstFetch, gettingPublishedNFTs, publishedNFTs } = useSelector(
    (state) => state.NFT
  );

  const { account, provider } = useSelector((state) => state.connection);

  useEffect(() => {
    if (!investments && !checkingInvestments) {
      dispatch(getInvestmentsFromWallet(account, provider));
    }
  }, [account]);

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!balances) {
      dispatch(getAssetsBalancesFromWallet(account, provider));
    }
  }, [account]);

  return (
    <>
      {gettingPublishedNFTs ? (
        <DotLoader
          color="rgba(91, 230, 202, 0.84)"
          loading={gettingPublishedNFTs}
          cssOverride={override}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {balances.landTokenBalances.map((landToken, idx) => (
            <DaoItem key={idx} balance={landToken} index={idx} />
          ))}
        </div>
      )}
    </>
  );
};
