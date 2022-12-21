import Web3 from "web3";
import { roundValue } from "../../utils/web3";
import { NFTAbi } from "../abis/landNFT";

const NFTAddress = "0x86178FF5C54d4156936cDDA87F9D0358D7e7c98e"; //mainnet

export const getNFTTotalSupply = async () => {
  const web3 = new Web3("https://forno.celo.org");

  const NFTContract = createLandNFTContract(web3, NFTAddress);
  console.log("nftcontract: ", NFTContract.methods);

  const totalSupply = await NFTContract.methods._totalLands().call();

  return totalSupply;
};

const createLandNFTContract = (web3, address) => {
  const contract = new web3.eth.Contract(NFTAbi, address);

  return contract;
};
