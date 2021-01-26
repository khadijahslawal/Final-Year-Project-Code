import web3 from "./web3";
import DeveloperContract from "./build/Developer.json";

export default address => {
  return new web3.eth.Contract(DeveloperContract.abi, address);
};