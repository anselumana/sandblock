// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Box {
    uint private value;

    function get() public view returns (uint) {
        return value;
    }

    function set(uint _value) public {
        value = _value;
    }
}