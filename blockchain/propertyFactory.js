import web3 from "./web3";
import PropertyFactory from "./build/PropertyFactory.json";

const instance = new web3.eth.Contract(
    PropertyFactory.abi,
    "0xc2b0805BF93F353799B58C767951742801aE8cB9"
  );
  
  export default instance;