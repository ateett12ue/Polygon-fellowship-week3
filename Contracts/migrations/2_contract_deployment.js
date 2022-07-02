const Coin = artifacts.require("StableCoinToken");
const Oracle = artifacts.require("Oracle"); 
const ChainlinkOracle = artifacts.require("PriceConsumer"); 
const Vault = artifacts.require("Vault"); 

module.exports = async function (deployer) {
  await deployer.deploy(Coin, "ONN Stable", "ONN");
  const coin = await Coin.deployed();
  await deployer.deploy(Oracle);
  const mOracle = await Oracle.deployed();
  await deployer.deploy(ChainlinkOracle);
  const oracle = await ChainlinkOracle.deployed();
  await deployer.deploy(Vault, coin.address, oracle.address);
  const vault = await Vault.deployed();
}