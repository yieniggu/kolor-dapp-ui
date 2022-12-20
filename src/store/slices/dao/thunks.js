import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../../../helpers/fetch";
import { requestSignature } from "../../../helpers/web3/common";
import {
  setCreatingProposal,
  setDao,
  setGettingProposals,
  setIsVoting,
} from "./daoSlice";

export const getProposals = (daoId) => {
  return async (dispatch) => {
    dispatch(setGettingProposals(true));

    const res = await fetchWithoutToken(`dao/${daoId}/proposals/`);
    const body = await res.json();
    console.log("proposals: ", body);

    dispatch(setDao({ daoId, proposals: body.proposals }));
    dispatch(setGettingProposals(false));
  };
};

export const createProposal = (data, daoId) => {
  return async (dispatch) => {
    dispatch(setCreatingProposal(true));

    const res = await fetchWithToken(
      `dao/${daoId}/proposals/internal`,
      data,
      "POST"
    );

    const body = await res.json();
    console.log("proposal created: ", body.result);

    dispatch(setCreatingProposal(false));
    dispatch(getProposals(daoId));
  };
};

export const createProposalFromWallet = (account, data, daoId, provider) => {
  return async (dispatch) => {
    dispatch(setCreatingProposal(true));

    try {
      console.log("account: ", account);
      console.log("data: ", data);
      // get signature
      const signature = await requestSignature(
        account,
        JSON.stringify(data),
        provider
      );
      data.stringified = JSON.stringify(data);
      data.signature = signature;
      data.address = account;

      const res = await fetchWithoutToken(
        `dao/${daoId}/proposals/external`,
        data,
        "POST"
      );

      const body = await res.json();

      if (body.ok) {
        dispatch(getProposals(daoId));
      } else {
        Swal.fire("Error", "Something went wrong =(", "error");
      }

      dispatch(setCreatingProposal(false));
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Something went wrong =(", "error");
      dispatch(setCreatingProposal(false));
    }
    // get signature

    // verify
  };
};

export const castVote = (data, daoId, proposalId) => {
  return async (dispatch) => {
    dispatch(setIsVoting(true));

    const res = await fetchWithToken(
      `dao/${daoId}/proposals/${proposalId}/vote/internal`,
      data,
      "POST"
    );

    const body = await res.json();
    console.log("vote casted: ", body.result);

    dispatch(setIsVoting(false));
    dispatch(getProposals(daoId));
  };
};

export const castVoteFromWallet = (data, provider) => {
  return async (dispatch) => {
    dispatch(setIsVoting(true));

    const { address, daoId, proposalId } = data;

    // sign message
    const signature = await requestSignature(
      address,
      JSON.stringify(data),
      provider
    );

    data.stringified = JSON.stringify(data);
    data.signature = signature;

    const res = await fetchWithToken(
      `dao/${daoId}/proposals/${proposalId}/vote/external`,
      data,
      "POST"
    );

    const body = await res.json();

    if (body.ok) {
      console.log("vote casted: ", body.result);
      dispatch(setIsVoting(false));
      dispatch(getProposals(daoId));
    } else {
      console.log(body);
      dispatch(setIsVoting(false));
      Swal.fire("Error", "Something went wrong =(", "error");
    }
  };
};
