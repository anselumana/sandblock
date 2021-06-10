// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Box {
    string private value;

    function get() public view returns (string memory) {
        return value;
    }

    function set(string memory _value) public {
        value = _value;
    }
}