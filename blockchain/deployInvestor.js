const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledInvestorFactory = require("./build/InvestorFactory.json");

const provider = new HDWalletProvider(
  "rug wage cricket oven engine cart still emerge distance rubber switch current",
  "https://rinkeby.infura.io/v3/09d5948969c741f4b1c3b07eebcc5d7b"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Deploying contract from account", accounts[0]);

  try {
    const result = await new web3.eth.Contract(compiledInvestorFactory.abi)
      .deploy({ data: '0x' + compiledInvestorFactory.evm.bytecode.object })
      .send({ gas: 8000000, from: accounts[0] });
    console.log("Investor Contract deployed to", result.options.address);
  } catch (err) {
    console.log(err);
  }
};

deploy();