import Web3 from "web3";
import { marketplaceAbi } from "../abis/marketplace";

const marketplaceAddress = "0x4e3e9AC6B6AD04f29e47cEDDA5067D12473108A7"; //mainnet

export const buyLandTokens = async (account, tokenId, amount, provider) => {
  const web3 = new Web3(provider);

  const marketplaceContract = createMarketplaceContract(
    web3,
    marketplaceAddress
  );

  const receipt = await marketplaceContract.methods
    .buyLandTokens(tokenId, amount)
    .send({ from: account });

  console.log("buy receipt: ", receipt);

  return receipt;
};

const createMarketplaceContract = (web3, address) => {
  const contract = new web3.eth.Contract(marketplaceAbi, address);

  return contract;
};
