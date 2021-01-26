  
import web3 from "./web3";
import DeveloperFactory from "./build/DeveloperFactory.json";

const instance = new web3.eth.Contract(
    DeveloperFactory.abi,
    "0xD0B0f759F5460d5DEa1f6274228a238c2C17998C"
  );
  
  export default instance;