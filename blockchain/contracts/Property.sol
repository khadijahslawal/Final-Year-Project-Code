 // SPDX-License-Identifier: MIT  
pragma solidity ^0.6.5;

contract PropertyFactory {
    address[] public deployedProperties;

    function createProperty(
        string memory _symbol,
        uint256 _tokenPrice,
        uint256 _initialSupply,
        uint256 _valuationPrice,
        uint256 _rentalPrice
    ) public {
        address newProperty =
            address(
                new PropertyContract(
                    _symbol,
                    _tokenPrice,
                    _initialSupply,
                    _valuationPrice,
                    _rentalPrice
                )
            );
        deployedProperties.push(newProperty);
    }

    function getDeployedProperties() public view returns (address[] memory) {
        return deployedProperties;
    }
}

contract PropertyContract {
    //constructors
    constructor(
        // string  memory _propertyNumber,
        // string memory _streetName,
        // string memory _city,
        // string memory _state,
        // string memory _country,
        // uint256 _beds,
        // uint256 _baths,
        string memory _symbol,
        uint256 _tokenPrice,
        uint256 _initialSupply,
        uint256 _valuationPrice,
        uint256 _rentalPrice
    ) public {
        // mainProperty = Property({
        developer = msg.sender;
        // propertyNumber: _propertyNumber,
        // streetName :_streetName,
        // city :_city,
        // state : _state,
        // country : _country,
        // noBedrooms : _beds,
        // noBathrooms : _baths,
        symbol = _symbol;
        tokenPrice = _tokenPrice;
        initialSupply = _initialSupply;
        currentSupply  =  _initialSupply;
        valuationPrice = _valuationPrice;
        isRented = false;
        rentalPrice = _rentalPrice;
        // });

        //Require that the property image is accurate
        emit PropertyInitialized(block.timestamp);
    }

    //Property Information
        address developer;
        // string propertyNumber;
        // string streetName;
        // string city;
        // string state;
        // string country;
        string symbol;
        uint256 tokenPrice;
        uint256 initialSupply;
        uint256 currentSupply;
        // uint256 noBedrooms;
        // uint256 noBathrooms;
        uint256 valuationPrice;
        bool isRented;
        uint256 rentalPrice;


    // Property mainProperty;

    function getPropertyDetails()
        public
        view
        returns (
            address,
            // string memory,
            // string memory,
            // string memory,
            // string memory,
            // string memory,
            // uint256,
            // uint256,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256,
            bool
        )
    {
        return (
            developer,
            // propertyNumber,
            // streetName,
            // city,
            // state,
            // country,
            // noBedrooms,
            // noBathrooms,
            symbol,
            tokenPrice,
            initialSupply,
            currentSupply,
            valuationPrice,
            isRented
        );
    }


    //Investors Information
    mapping(address => uint256) public investorsBalance;
    mapping(address => uint256) public investorsTokens;
    mapping(address => bool) public rentalApprovers;
    uint256 public numInvestors;

    function calculateInvestmentAmount(uint256 _amount)
        public
        view
        returns (uint256)
    {
        require(currentSupply > 0, "Initial Offering is over");
        uint256 investmentAmount = _amount * tokenPrice;
        return (investmentAmount);
    }

    //Investing Methods
    function invest(uint256 _amount) public payable returns (bool) {
        require(msg.value == _amount * tokenPrice);
        investorsBalance[msg.sender] = msg.value;
        investorsTokens[msg.sender] = _amount;
        rentalApprovers[msg.sender] = true;
        numInvestors++;
    }

    function investmentProgress() public view returns (uint256, uint256) {
        return (initialSupply, currentSupply);
    }
     
    function amountEarned() public view returns (uint256) {
        return address(this).balance;
    }

    function approveRentalRequest(uint256 indexOfRequest) public {
        RentalRequest storage request = rentalRequests[indexOfRequest];

        require(rentalApprovers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    //Renters Information
    struct RentalRequest {
        uint256 proposedRentalPrice;
        address rentalSeeker;
        bool rentalRequestCompleted;
        string requestStatus;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    uint256 rentalRevenue;
    RentalRequest[] public rentalRequests;
    address public tenant;

    //Rental Methods
    function createRentalRequests(uint256 _rentalPrice) public {
        RentalRequest memory newRequest =
            RentalRequest({
                proposedRentalPrice: _rentalPrice,
                rentalSeeker: msg.sender,
                rentalRequestCompleted: false,
                approvalCount: 0,
                requestStatus: "Awaiting"
            });
        rentalRequests.push(newRequest);
    }

    function finalizeRequest(uint256 indexOfRequest) public  {
        RentalRequest storage request = rentalRequests[indexOfRequest];
        require(!request.rentalRequestCompleted);
        require(request.approvalCount >= (numInvestors / 2));
        request.rentalRequestCompleted = true;
        tenant = request.rentalSeeker;
        rentalPrice = request.proposedRentalPrice;
        request.requestStatus = "Accepted";
        emit rentalRequestAccepted(true);
    }

    function payRent() public payable {
        require(msg.value == rentalPrice);
        isRented = true;
        emit rentPaid(msg.sender, block.timestamp);
    }

    //Events
    event PropertyInitialized(uint256 date);
    event rentPaid(address _tenant, uint256 date);
    event rentalRequestAccepted(bool outcome);

    //Modifiers
    modifier onlyDeveloper() {
        require(msg.sender == developer);
        _;
    }

    modifier onlyTenat() {
        require(msg.sender == tenant);
        _;
    }

     function getRentalRequestCount()public view returns(uint){
        return rentalRequests.length;
    }
}
