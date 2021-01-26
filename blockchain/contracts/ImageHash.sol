// SPDX-License-Identifier: MIT
pragma solidity ^0.6.5;

contract ImageHash {
    constructor() public {}

    string[] public imageHashes;

    function addNewHash(string memory _hash) public {
        imageHashes.push(_hash);
    }

    function checkIfHashExists(string memory _hash) public returns (string memory) {
        for (uint256 i = 0; i < imageHashes.length; i++) {
            if (keccak256(abi.encodePacked(imageHashes[i])) == keccak256(abi.encodePacked(_hash))){
                return ("Image is not unique");
            }
        }
        imageHashes.push(_hash);
    }
}
