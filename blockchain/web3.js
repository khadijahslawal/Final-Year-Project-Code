import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // if we are in browser and Metamask is already installed
  window.ethereum.enable();
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on server or user is not running Metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/09d5948969c741f4b1c3b07eebcc5d7b"
  );
  web3 = new Web3(provider);
}

export default web3;