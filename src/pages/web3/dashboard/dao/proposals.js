import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { useAccount } from "wagmi";
import { ProposalItem } from "../../../../components/items/proposalItem";
import { getProposals } from "../../../../store/slices/dao";
const override = {
  margin: "0 auto",
  display: "block",
};

export const Proposals = () => {
  const { daoId, proposals, gettingProposals } = useSelector(
    (state) => state.dao
  );

  const { address } = useAccount();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("getting with id");
    // console.log(daoId, id);
    if (daoId != id) {
      dispatch(getProposals(id, address));
    }
  }, [id]);

  useEffect(() => {
    // console.log("getting with address");
    if (address && !gettingProposals) dispatch(getProposals(id, address));
  }, [address]);

  return (
    <div>
      {gettingProposals ? (
        <DotLoader
          color="rgba(91, 230, 202, 0.84)"
          loading={gettingProposals}
          cssOverride={override}
        />
      ) : (
        <div className="w-full">
          <h1 className="text-white text-md">Proposals</h1>
          {proposals.map((proposal) => (
            <ProposalItem proposal={proposal} />
          ))}

          {proposals.length === 0 && (
            <h1 className="text-white border-b-2 border-app-green text-md text-center mt-20">
              No proposals have been created yet...
            </h1>
          )}
        </div>
      )}
    </div>
  );
};
