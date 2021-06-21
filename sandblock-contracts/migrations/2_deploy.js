const Box = artifacts.require("Box");
const SandblockToken = artifacts.require("SandblockToken");


const deplyBox = (deployer) => {
  deployer.deploy(Box);
}

const deploySandblockToken = (deployer) => {
  const initialSupply = 10 ** 6;
  deployer.deploy(SandblockToken, initialSupply);
}

module.exports = (deployer) => {
  deplyBox(deployer);
  deploySandblockToken(deployer);
};
