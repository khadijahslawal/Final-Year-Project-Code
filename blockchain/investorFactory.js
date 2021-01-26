import web3 from "./web3";
import InvestorFactory from "./build/InvestorFactory.json";

const instance = new web3.eth.Contract(
    InvestorFactory.abi,
    "0x5Bc7429162274Fa390328867195D7Ac755D26d62"
  );
  
  export default instance;