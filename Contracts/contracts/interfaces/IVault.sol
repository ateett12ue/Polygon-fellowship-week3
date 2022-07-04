// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVault {
    struct Vault {
        uint256 collateralAmount; // The amount of collateral held by the vault contract
        uint256 debtAmount; // The amount of stable coin that was minted against the collateral
    }

    event Deposit(uint256 collateralDeposited, uint256 amountMinted);
    event Withdraw(uint256 collateralWithdrawn, uint256 amountBurned);

    /**
    @notice Allows a user to deposit ETH collateral in exchange for some amount of stablecoin
    @param amountToDeposit  The amount of ether the user sent in the transaction
     */
    function deposit(uint256 amountToDeposit) payable external;
    
    /**
    @notice Allows a user to withdraw up to 100% of the collateral they have on deposit
    @dev This cannot allow a user to withdraw more than they put in
     */
    function withdraw() external;
}