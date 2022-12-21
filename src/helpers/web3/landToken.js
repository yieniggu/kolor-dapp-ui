import { usePrepareContractWrite } from "wagmi";
import Web3 from "web3";
import { roundValue } from "../../utils/web3";
import { landTokenAbi } from "../abis/landToken";
import { getNFTTotalSupply } from "./NFT";

const landTokenAddress = "0xF4A5Fd81A539C0aA11F6C6592fd4E3bD02Fbd420"; //mainnet

export const getLandTokenBalanceFromWallet = async (account) => {
  const web3 = new Web3("https://forno.celo.org");
  const landToken = createLandTokenContract(web3, landTokenAddress);

  // get total supply
  const totalSupply = await getNFTTotalSupply();
  console.log("totalSUpply: ", totalSupply);
  let ids = [];

  for (let i = 0; i < totalSupply; i++) {
    ids.push([i]);
  }

  if (ids.length === 0) return [];

  const balances = await landToken.methods.balancesOf(account, ids).call();
  return balances;
};

export const getInvestmentsOf = async (address) => {
  const web3 = new Web3("https://forno.celo.org");
  const landToken = createLandTokenContract(web3, landTokenAddress);

  const investments = await landToken.methods
    .investmentsOfAddress(address)
    .call();

  return investments;
};

export const getAvailableVotingPower = async (address, tokenId, block) => {
  // console.log(address, tokenId, block);
  try {
    const web3 = new Web3("https://forno.celo.org");

    const landTokenContract = createLandTokenContract(web3, landTokenAddress);
    const balance = await landTokenContract.methods
      .balanceOf(address, tokenId)
      .call({ defaultBlock: block || "latest" });

    // console.log("balance: ", balance);
    return balance;
  } catch (error) {
    console.error(error);
    if (error.message.includes("missing trie node")) {
      const web3 = new Web3(
        "https://magical-special-model.celo-mainnet.discover.quiknode.pro/a30474bc578f489e3d631cf898c76b7b754f2acf/"
      );

      const landTokenContract = createLandTokenContract(web3);
      const balance = await landTokenContract.methods
        .balanceOf(address, tokenId)
        .call({ defaultBlock: block || "latest" });

      // console.log("balance: ", balance);
      return balance;
    }
  }
};

const createLandTokenContract = (web3, address) => {
  const contract = new web3.eth.Contract(landTokenAbi, address);

  return contract;
};
