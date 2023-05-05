// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Transactions {
  uint256 transactionCount;

  // Events allow clients to react to specific
  // contract changes you declare
  event Send(address from, address to, uint amount, string message, uint256 timestamp);

  // Structs are custom defined types that can group several variables
  struct SendStruct {
    address from;
    address to;
    uint amount;
    string message;
    uint256 timestamp;
  }

  // contain all sent transactions
  SendStruct[] transactions;

  function addToBlockchain(address payable to, uint amount, string memory message) public {
    // add transaction to blockchain
    transactionCount += 1;
    transactions.push(SendStruct(msg.sender, to, amount, message, block.timestamp));

    emit Send(msg.sender, to, amount, message, block.timestamp);
  }

  function getTransactions() public view returns (SendStruct[] memory) {
    // returns all transactions
    return transactions;
  }

  function getTransactionsCount() public view returns (uint256) {
    // returns all transactions count
    return transactionCount;
  }
}