import Web3 from "web3";
import { roundValue } from "../../utils/web3";
import { landTokenAbi } from "../abis/landToken";
import { getNFTTotalSupply } from "./NFT";

const landTokenAddress = "0xF4A5Fd81A539C0aA11F6C6592fd4E3bD02Fbd420"; //mainnet

export const getLandTokenBalanceFromWallet = async (account, provider) => {
  const web3 = new Web3(provider);
  const landToken = createLandTokenContract(web3, landTokenAddress);

  // get total supply
  const totalSupply = await getNFTTotalSupply(provider);
  console.log("totalSUpply: ", totalSupply);
  let ids = [];

  for (let i = 0; i < totalSupply; i++) {
    ids.push([i]);
  }

  if (ids.length === 0) return [];

  const balances = await landToken.methods.balancesOf(account, ids).call();
  return balances;
};

export const getInvestmentsOf = async (address, provider) => {
  const web3 = new Web3(provider);
  const landToken = createLandTokenContract(web3, landTokenAddress);

  const investments = await landToken.methods
    .investmentsOfAddress(address)
    .call();

  return investments;
};

const createLandTokenContract = (web3, address) => {
  const contract = new web3.eth.Contract(landTokenAbi, address);

  return contract;
};
