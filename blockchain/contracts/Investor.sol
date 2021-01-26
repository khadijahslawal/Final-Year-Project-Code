 // SPDX-License-Identifier: MIT  
pragma solidity ^0.6.5;

contract InvestorFactory{
    address[] public deployedInvestorContracts;
    
    address public investor;
    constructor() public{
        investor = msg.sender;
    }
    
    function createInvestor(string memory _firstName, string memory _lastName, string memory _emailAddress) public  {
        address newInvestor = address(new Investor(_firstName, _lastName, _emailAddress));
        deployedInvestorContracts.push(newInvestor);
    }
    
    function returnLastInvestorAddress() public view  returns(address){
        uint length = deployedInvestorContracts.length;
        uint index = length - 1;
        return deployedInvestorContracts[index];
    }
    function getDeployedInvestors() public view returns(address[] memory) {
        return deployedInvestorContracts;
    }
}

contract Investor{

    address public ethAddress;
    string public firstName;
    string public lastName;
    string public email;
    uint256 public networth;
    address [] public investedProperties;
    
    constructor(string memory _firstName, string memory _lastName, string memory _email) public{
        ethAddress = msg.sender;
        firstName = _firstName;
        lastName = _lastName;
        email = _email;
        //require id document is verified 
        emit RegisteredInvestor(block.timestamp);
    }


    function getInvestorDetails() public view returns (string memory, string memory, string memory, address){
        return(
            firstName,
            lastName,
            email,
            ethAddress
        );
    }
    event RegisteredInvestor(uint date);

    
    function adddNetworth (uint256 amount, uint256 tokenPrice) public returns (uint256){
        networth += (amount * tokenPrice);
    }

    function returnNetworth() public view returns (uint256){
        return networth;
    }

    function addInvestedProperty(address propertyAddress) public {
        investedProperties.push(propertyAddress);
    }
}