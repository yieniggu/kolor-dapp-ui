export const landTokenAbi = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "kolorNFTAddress", internalType: "address" },
      { type: "address", name: "_marketplaceAddress", internalType: "address" },
    ],
  },
  {
    type: "event",
    name: "NewInvestment",
    inputs: [
      {
        type: "address",
        name: "investor",
        internalType: "address",
        indexed: false,
      },
      {
        type: "uint256",
        name: "tokenId",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "tokenPrice",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addNewTokens",
    inputs: [
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "authorize",
    inputs: [{ type: "address", name: "operator", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "availableTokensOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "balanceOf",
    inputs: [
      { type: "address", name: "account", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "", internalType: "uint256[]" }],
    name: "balanceOfBatch",
    inputs: [
      { type: "address[]", name: "accounts", internalType: "address[]" },
      { type: "uint256[]", name: "ids", internalType: "uint256[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "balances",
    inputs: [
      { type: "uint256", name: "", internalType: "uint256" },
      { type: "address", name: "", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "", internalType: "uint256[]" }],
    name: "balancesOf",
    inputs: [
      { type: "address", name: "account", internalType: "address" },
      { type: "uint256[]", name: "tokenIds", internalType: "uint256[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "creationOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getLandTokenBalance",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "", internalType: "uint256[]" }],
    name: "getLandTokenBalances",
    inputs: [
      { type: "uint256[]", name: "tokenIds", internalType: "uint256[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "holders",
    inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Investment",
        components: [
          { type: "uint256", name: "tokenId", internalType: "uint256" },
          { type: "address", name: "account", internalType: "address" },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "uint256", name: "tokenPrice", internalType: "uint256" },
          { type: "string", name: "unit", internalType: "string" },
          { type: "uint256", name: "creationDate", internalType: "uint256" },
        ],
      },
    ],
    name: "investmentOfAddress",
    inputs: [
      { type: "address", name: "account", internalType: "address" },
      { type: "uint256", name: "index", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct Investment",
        components: [
          { type: "uint256", name: "tokenId", internalType: "uint256" },
          { type: "address", name: "account", internalType: "address" },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "uint256", name: "tokenPrice", internalType: "uint256" },
          { type: "string", name: "unit", internalType: "string" },
          { type: "uint256", name: "creationDate", internalType: "uint256" },
        ],
      },
    ],
    name: "investmentOfLand",
    inputs: [
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "uint256", name: "index", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "address", name: "account", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "uint256", name: "tokenPrice", internalType: "uint256" },
      { type: "string", name: "unit", internalType: "string" },
      { type: "uint256", name: "creationDate", internalType: "uint256" },
    ],
    name: "investmentsByAddress",
    inputs: [
      { type: "address", name: "", internalType: "address" },
      { type: "uint256", name: "", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "address", name: "account", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "uint256", name: "tokenPrice", internalType: "uint256" },
      { type: "string", name: "unit", internalType: "string" },
      { type: "uint256", name: "creationDate", internalType: "uint256" },
    ],
    name: "investmentsByLand",
    inputs: [
      { type: "uint256", name: "", internalType: "uint256" },
      { type: "uint256", name: "", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        name: "",
        internalType: "struct Investment[]",
        components: [
          { type: "uint256", name: "tokenId", internalType: "uint256" },
          { type: "address", name: "account", internalType: "address" },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "uint256", name: "tokenPrice", internalType: "uint256" },
          { type: "string", name: "unit", internalType: "string" },
          { type: "uint256", name: "creationDate", internalType: "uint256" },
        ],
      },
    ],
    name: "investmentsOfAddress",
    inputs: [{ type: "address", name: "account", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        name: "",
        internalType: "struct Investment[]",
        components: [
          { type: "uint256", name: "tokenId", internalType: "uint256" },
          { type: "address", name: "account", internalType: "address" },
          { type: "uint256", name: "amount", internalType: "uint256" },
          { type: "uint256", name: "tokenPrice", internalType: "uint256" },
          { type: "string", name: "unit", internalType: "string" },
          { type: "uint256", name: "creationDate", internalType: "uint256" },
        ],
      },
    ],
    name: "investmentsOfLand",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isAuthorized",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "kolorLandNFT",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct LandTokensInfo",
        components: [
          { type: "uint256", name: "initialAmount", internalType: "uint256" },
          { type: "uint256", name: "currentAmount", internalType: "uint256" },
          { type: "uint256", name: "available", internalType: "uint256" },
          { type: "uint256", name: "sold", internalType: "uint256" },
          { type: "uint256", name: "creationDate", internalType: "uint256" },
          { type: "uint256", name: "lastUpdate", internalType: "uint256" },
          { type: "uint256", name: "tokenPrice", internalType: "uint256" },
          { type: "string", name: "unit", internalType: "string" },
        ],
      },
    ],
    name: "landTokenInfoOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256", name: "initialAmount", internalType: "uint256" },
      { type: "uint256", name: "currentAmount", internalType: "uint256" },
      { type: "uint256", name: "available", internalType: "uint256" },
      { type: "uint256", name: "sold", internalType: "uint256" },
      { type: "uint256", name: "creationDate", internalType: "uint256" },
      { type: "uint256", name: "lastUpdate", internalType: "uint256" },
      { type: "uint256", name: "tokenPrice", internalType: "uint256" },
      { type: "string", name: "unit", internalType: "string" },
    ],
    name: "landTokensInfo",
    inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "lastUpdateOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "marketplaceAddress",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "newInvestment",
    inputs: [
      { type: "address", name: "investor", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "priceOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "safeTransferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setDevAddress",
    inputs: [{ type: "address", name: "operator", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setKolorLandAddress",
    inputs: [{ type: "address", name: "newAddress", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setLandTokenInfo",
    inputs: [
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "uint256", name: "initialAmount", internalType: "uint256" },
      { type: "uint256", name: "tokenPrice", internalType: "uint256" },
      { type: "string", name: "unit", internalType: "string" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setMarketplaceAddress",
    inputs: [{ type: "address", name: "newAddress", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setTokenPrice",
    inputs: [
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "uint256", name: "price", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "soldTokensOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalInvestments",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalInvestmentsByAddress",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalInvestmentsByLand",
    inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalInvestmentsOfAddress",
    inputs: [{ type: "address", name: "account", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalInvestmentsOfLand",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "unitOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
];
