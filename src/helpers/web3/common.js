import Web3 from "web3";

export const requestSignature = async (account, data, provider) => {
  const web3 = new Web3(provider);

  // console.log("stringified data: ", data);
  const signature = await web3.eth.personal.sign(data, account, null);

  return signature;
};
