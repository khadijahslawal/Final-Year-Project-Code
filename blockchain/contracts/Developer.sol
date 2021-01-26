 // SPDX-License-Identifier: MIT  
pragma solidity ^0.6.5;
contract DeveloperFactory{
    address[] public deployedDeveloperContracts;
    
    address public admin;
    constructor() public{
        admin = msg.sender;
    }
    
    function createDeveloper(string memory _firstName, string memory _lastName, string memory _email,
                string memory _businessName, string memory _crNumber, string memory _state, string memory _country) public  {
        address newDeveloper = address(new Developer(_firstName, _lastName, _email, _businessName,_crNumber, _state, _country));
        deployedDeveloperContracts.push(newDeveloper);
    }
    
    function returnLastDeveloperAddress() public view  returns(address){
        uint length = deployedDeveloperContracts.length;
        uint index = length - 1;
        return deployedDeveloperContracts[index];
    }
    function getDeployedDevelopers() public view returns(address[] memory) {
        return deployedDeveloperContracts;
    }
}

contract Developer{

    address public ethAddress;
    string public firstName;
    string public lastName;
    string public email;
    uint256 public networth;
    string public businessName;
    string public crNumber;
    string public state;
    string public country;

    address [] public tokenizedProperties;

    constructor(string memory _firstName, string memory _lastName, string memory _email,
                string memory _businessName, string memory _crNumber, string memory _state, string memory _country ) public{
        ethAddress = msg.sender;
        firstName = _firstName;
        lastName = _lastName;
        email = _email;
        businessName = _businessName;
        crNumber = _crNumber;
        state = _state;
        country = _country;
        networth = 0;
        //require id document is verified 
     emit RegisteredDeveloper(block.timestamp);

    }


    function getDeveloperDetails() public view returns (string memory, string memory, string memory, address){
        return(
            firstName,
            lastName,
            email,
            ethAddress
        );
    }
    event RegisteredDeveloper(uint date);
    //Functionalities Left
    //Developer Platfrom Networth

    function adddNetworth (uint256 amount, uint256 tokenPrice) public returns (uint256){
        networth += (amount * tokenPrice);
    }

    function returnNetworth() public view returns (uint256){
        return networth;
    }

    function addTokenizedProperty(address propertyAddress) public {
        tokenizedProperties.push(propertyAddress);
    }
}