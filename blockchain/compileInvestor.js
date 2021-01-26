const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');


const buildPath = path.resolve(__dirname, 'build');
// fs.removeSync(buildPath);

const investorPath = path.resolve(__dirname, 'contracts', 'Investor.sol');
const source = fs.readFileSync(investorPath, 'utf8');

var input = {
  language: "Solidity",
  sources: {
    "Investor.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
    output.errors.forEach(err => {
      console.log(err.formattedMessage);
    });
  } else {
    const contracts = output.contracts["Investor.sol"];
    fs.ensureDirSync(buildPath);
    for (let contractName in contracts) {
      const contract = contracts[contractName];
      fs.writeFileSync(
        path.resolve(buildPath, `${contractName}.json`),
        JSON.stringify(contract, null, 2),
        "utf8"
      );
    }
  }