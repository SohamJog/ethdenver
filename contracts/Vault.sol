// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract Vault {
    address public sender;
    uint256 amount;

    constructor () payable {
        amount = msg.value;
        sender = msg.sender;
    }

     function withdraw() external {
        payable(msg.sender).transfer(amount);
        amount = 0; // Reset the amount after withdrawal
    }
}


contract VaultFactory {
    mapping(bytes32 => address) public vaults;

    function createVault(bytes32 id) external payable {
        require(vaults[id] == address(0), "Vault with this ID already exists");
        Vault newVault = new Vault{value: msg.value}();
        vaults[id] = address(newVault);
    }
    
}
