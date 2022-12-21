import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { useAccount, useSignMessage } from "wagmi";
import SideBar from "../../../../components/sidebar/web3";
import Layout from "../../../../layout/web3";
import { castVoteFromWallet, getProposals } from "../../../../store/slices/dao";
import { Dropdown } from "./optionsDropdown";

const override = {
  margin: "0 auto",
  display: "block",
};

export const Proposal = () => {
  const { publishedNFTs } = useSelector((state) => state.NFT);
  const { balances } = useSelector((state) => state.token);
  const { proposals, daoId, gettingProposals, isVoting } = useSelector(
    (state) => state.dao
  );

  const { address } = useAccount();
  const { id, proposal: proposalId } = useParams();
  const dispatch = useDispatch();

  const [proposal, setProposal] = useState(null);
  const [votes, setVotes] = useState([0, 0, 0]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      console.log(data, variables);
      dispatch(castVoteFromWallet(JSON.parse(variables.message), data));
    },
  });

  useEffect(() => {
    if (daoId && daoId === id) {
      const found = proposals.find(({ _id }) => _id === proposalId);

      setProposal(found);
    } else {
      dispatch(getProposals(id));
    }
  }, [daoId, proposals]);

  useEffect(() => {
    if (proposal) {
      countVotes();
      const { votes } = proposal;
      const userVote = votes.find(
        ({ address: authorAddress }) => authorAddress.toLowerCase() === address
      );

      console.log(userVote);
      userVote ? setHasVoted(true) : setHasVoted(false);
      console.log(hasVoted);
    }
  }, [proposal, address]);

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
      setVotes(votes);
    }
  };

  const sendVote = () => {
    console.log(selectedOption, id, proposalId);
    const voteData = {
      address,
      votes: proposal.availableVotingPower,
      option: selectedOption,
      daoId,
      proposalId,
      voteDate: new Date(),
    };

    signMessage({ message: JSON.stringify(voteData) });
  };

  return (
    <div>
      <Layout title="Kolor | Proposal">
        <div className="flex gap-16 bg-dashboard min-h-screen w-full">
          <SideBar />
          <div className="flex flex-row pt-48 w-4/5">
            {gettingProposals || !proposal ? (
              <DotLoader
                color="rgba(91, 230, 202, 0.84)"
                loading={gettingProposals}
                cssOverride={override}
              />
            ) : (
              <div>
                <div className="flex flex-col xl:flex-row font-sans text-white">
                  <div className="flex flex-col lg:w-4/5">
                    <h1 className="md:mt-0 mt-10 text-lg font-medium">
                      {proposal.title}
                    </h1>
                    <div className="flex flex-col md:flex-row mt-6 gap-4">
                      <div className="rounded-full bg-interaction md:w-20 w-2/6 md:px-4 py-1">
                        <p className="text-center">
                          {new Date(proposal.endDate) > new Date()
                            ? "Active"
                            : "Closed"}
                        </p>
                      </div>
                      {publishedNFTs && (
                        <Link
                          className="my-auto text-gray-400"
                          to={`/dao/${proposal.daoId}`}
                        >
                          <p>{publishedNFTs[proposal.tokenId].name}</p>
                        </Link>
                      )}
                      <p className="my-auto font-bold">
                        by{" "}
                        {proposal.authorName ||
                          `${proposal.authorAddress.substr(
                            0,
                            6
                          )}...${proposal.authorAddress.substr(
                            34,
                            proposal.authorAddress.length
                          )}`}
                      </p>
                    </div>
                    <hr className="mt-6 xl:mr-0 md:mr-4" />
                    <h2 className="text-md font-bold mt-2">Summary</h2>
                    <p className="text-justify xl:w-full md:w-11/12 w-[calc(100vw-40px)] font-medium py-4">
                      {proposal.summary}
                      <span className="invisible">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col lg:w-2/5 md:w-11/12 w-[calc(100vw-40px)] xl:ml-6 mr-4 3xl:mr-0">
                    <div className="flex flex-col rounded-lg border border-gray-400 px-4 pb-4">
                      <h2 className="text-sm font-medium p-2 border-b">
                        Information
                      </h2>

                      <div className="flex flex-col xl:flex-row justify-between font-medium mt-4">
                        <p className="w-1/2 text-gray-400">Start Date</p>
                        <p className="w-1/2">
                          {new Date(proposal.startDate).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col xl:flex-row justify-between font-medium mt-4">
                        <p className="w-1/2 text-gray-400">End Date</p>
                        <p className="w-1/2">
                          {new Date(proposal.endDate).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col xl:flex-row justify-between font-medium mt-4">
                        <p className="w-1/2 text-gray-400">Reference Block</p>
                        <p className="w-1/2">
                          <a
                            href={`https://explorer.celo.org/mainnet/block/${proposal.block}/transactions`}
                            target="_blank"
                          >
                            {proposal.block}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full mx-auto mt-10">
                      <div className="flex flex-col rounded-lg border border-gray-400 px-4 pb-4">
                        <h2 className="text-sm font-medium p-2 border-b">
                          Results
                        </h2>

                        {proposal.options.map((option, idx) => (
                          <div>
                            <div className="flex flex-row justify-between font-medium mt-2">
                              <p>{option}</p>
                              <p>
                                {proposal.votes.length > 0
                                  ? `${votes[idx]} LT ${
                                      (votes[idx] / totalVotes) * 100
                                    } %`
                                  : "0 %"}
                              </p>
                            </div>
                            <div className="relative rounded-full bg-gray-600 bg-opacity-60 h-4 mt-2">
                              <div
                                className="absolute bg-interaction h-4 rounded-full "
                                style={{
                                  width: `${(votes[idx] / totalVotes) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                        {new Date() > new Date(proposal.endDate) ? (
                          <p className="mt-4 text-sm text-end">
                            This proposal is closed
                          </p>
                        ) : hasVoted ? (
                          <p className="mt-4 text-sm text-end">
                            You have already voted!
                          </p>
                        ) : proposal.availableVotingPower > 0 ? (
                          <div className="flex flex-row justify-between mt-4">
                            <Dropdown
                              options={proposal.options}
                              selectedOption={selectedOption}
                              setSelectedOption={setSelectedOption}
                            />
                            <button
                              className="rounded-lg w-40 py-1 bg-interaction bg-opacity-75 hover:bg-opacity-100"
                              onClick={sendVote}
                              disabled={isVoting}
                            >
                              {isVoting ? (
                                <p className="animate-ping">Please wait</p>
                              ) : (
                                "Vote!"
                              )}
                            </button>
                          </div>
                        ) : (
                          <p className="text-red-500">
                            Your voting power at block {proposal.block} is not
                            enough!
                          </p>
                        )}
                        {!hasVoted && proposal.availableVotingPower > 0 && (
                          <p className="text-red-500 ml-auto">
                            Votes cannot be changed
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col rounded-lg 3xl:mb-0 mb-10 xl:w-3/5 xl:mt-14 mt-10 md:w-[calc(100vw-290px)] w-[calc(100vw-40px)] border border-gray-500 text-white">
                    <div className="flex flex-row px-6 py-2 gap-6">
                      <h2 className="text-sm font-medium">Votes</h2>
                      <p className="rounded-full px-4 my-auto bg-gray-500 bg-opacity-75">
                        {proposal.votes.length}
                      </p>
                    </div>
                    {proposal.votes.map((vote) => (
                      <div className="flex flex-col xl:flex-row border-t border-gray-500 justify-between px-4 py-2 font-medium text-center">
                        <div className="md:flex inline-block flex-row  gap-2">
                          <img
                            className="rounded-full group-hover:opacity-80 xl:w-8 xl:h-8 w-6 h-6 mx-auto"
                            src={`https://cdn.stamp.fyi/avatar/${vote.address}`}
                          />{" "}
                          <p className="hidden md:block my-auto">
                            {vote.address}
                          </p>
                          <p className="md:hidden">
                            {vote.address.substr(0, 14)}.....
                            {vote.address.substr(28, vote.address.length)}
                          </p>
                        </div>

                        <p className="my-auto">
                          {proposal.options[vote.option]}
                        </p>
                        <div className="my-auto">
                          <p>
                            {vote.votes}LT{" "}
                            <a
                              href={`https://signator.io/view?message=${vote.message}&signatures=${vote.signature}&addresses=${vote.address}`}
                              target="_blank"
                            >
                              <i className="fa-solid fa-signature text-interaction opacity-75 hover:opacity-100"></i>
                            </a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};
