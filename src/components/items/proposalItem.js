import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProposalItem = ({ proposal }) => {
  const [votesInfo, setVotesInfo] = useState([0, 0, 0]);
  const [totalVotes, setTotalVotes] = useState(0);

  const endDate = new Date(proposal.endDate);
  const now = new Date();

  const navigate = useNavigate();

  const countVotes = () => {
    let votes = [0, 0, 0];
    let totalVotes = 0;

    if (votes.length > 0) {
      for (const vote of proposal.votes) {
        const option = vote.option;
        const amount = vote.votes;

        votes[option] += amount;
        totalVotes += amount;
      }

      setTotalVotes(totalVotes);
      setVotesInfo(votes);
    }
  };

  useEffect(() => {
    countVotes();
  }, [proposal]);

  const handleNavigate = () => {
    navigate(`/dao/${proposal.daoId}/proposals/${proposal._id}`);
  };

  return (
    <div
      className="flex flex-col w-full min-w-full grow rounded-2xl border border-gray-400 bg-gray-600 text-white p-4 px-10 mt-10 pb-10 cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-4">
          <img
            className="rounded-full group-hover:opacity-80 w-10 h-10 my-auto"
            src={`https://cdn.stamp.fyi/avatar/${proposal.authorAddress}`}
          />
          <h2 className="my-auto text-sm">
            {proposal.authorName
              ? proposal.authorName
              : `${proposal.authorAddress.substr(
                  0,
                  6
                )}...${proposal.authorAddress.substr(34)}`}
          </h2>
        </div>
        <div className="right-0 bg-interaction rounded-full my-auto py-1 px-2 sm:px-4 sm:py-2">
          {endDate.getTime() > now.getTime() ? "Active" : "Closed"}
        </div>
      </div>

      <h1 className="text-md font-sans mt-6">{proposal.title}</h1>
      <h2 className="text-xs w-full">
        {proposal.summary.length > 280
          ? proposal.summary.substr(0, 280)
          : proposal.summary}
        ...
        <span className="invisible">
          {"a".repeat(Math.max(140 - proposal.summary.length, 0))}
        </span>
      </h2>

      {votesInfo &&
        proposal.options.map((option, idx) => (
          <div className="relative w-full bg-black mt-4 rounded-md h-10">
            <div
              className={`absolute bg-gray-500 h-10 rounded-md bg-opacity-50`}
              style={{ width: `${(votesInfo[idx] / totalVotes) * 100}%` }}
            ></div>
            <div className="flex flex-row my-2 sm:my-auto justify-between">
              <h2 className="ml-2 sm:text-sm my-auto font-sans">
                {option}{" "}
                <span className="ml-2 text-xs sm:text-sm text-gray-400">
                  {votesInfo[idx]} LandTokens
                </span>
              </h2>
              <p className="text-xs sm:text-sm font-sans my-auto tiny:mr-2 sm:mr-10">
                {proposal.votes.length > 0
                  ? `${(votesInfo[idx] / totalVotes) * 100}%`
                  : "0 %"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
