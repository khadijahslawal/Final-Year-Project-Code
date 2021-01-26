import web3 from "./web3";
import PropertyFactory from "./build/PropertyFactory.json";

const instance = new web3.eth.Contract(
    PropertyFactory.abi,
    "0xbf92dF778840e8b166cADfa2Cdc43aD544f634B2"
  );
  
  export default instance;