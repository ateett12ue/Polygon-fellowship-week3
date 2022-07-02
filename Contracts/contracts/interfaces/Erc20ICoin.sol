// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICoin {
    /**
    @notice Mints a specified amount of tokens to an account
    @param account  the account to receive the new tokens
    @param amount  the amount to be minted
     */
    function mint(address account, uint256 amount) external returns(bool);

    /**
    @notice Burns a specified amount of tokens from an account
    @param account  the account to burn the tokens from
    @param amount  the amount to be burned
     */
    function burn(address account, uint256 amount) external returns(bool);
}