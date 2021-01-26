import web3 from "./web3";
import InvestorContract from "./build/Investor.json";

export default address => {
  return new web3.eth.Contract(InvestorContract.abi, address);
};