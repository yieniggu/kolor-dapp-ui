import Web3 from "web3";
import { roundValue } from "../../utils/web3";
import { ERC20Abi } from "../abis/ERC20";

// const cUSDAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; //testnet
const cUSDAddress = "0x765DE816845861e75A25fCA122bb6898B8B1282a"; //mainnet
const marketplaceAddress = "0x4e3e9AC6B6AD04f29e47cEDDA5067D12473108A7"; //mainnet

export const getcUSDBalanceFromWallet = async (address, provider) => {
  const web3 = new Web3(provider);
  const cUSD = createERC20Contract(web3, cUSDAddress);

  const balance = await cUSD.methods.balanceOf(address).call();

  const balanceInEth = web3.utils.fromWei(balance, "ether");

  console.log(balanceInEth);

  if (balanceInEth % 1 == 0) {
    return roundValue(balanceInEth, 2);
  }
  return roundValue(balanceInEth, 5);
};

export const getAllowance = async (account, provider) => {
  const web3 = new Web3(provider);
  const cUSD = createERC20Contract(web3, cUSDAddress);

  const allowance = await cUSD.methods
    .allowance(account, marketplaceAddress)
    .call();

  console.log("allowance: ", allowance);
  return allowance;
};

export const approve = async (account, provider) => {
  const web3 = new Web3(provider);
  const cUSD = createERC20Contract(web3, cUSDAddress);

  const totalSupply = await cUSD.methods.totalSupply().call();

  const receipt = await cUSD.methods
    .approve(marketplaceAddress, totalSupply)
    .send({ from: account });

  return receipt;
};

const createERC20Contract = (web3, address) => {
  const contract = new web3.eth.Contract(ERC20Abi, address);

  return contract;
};
