const { network } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  const arguments = [];

  log("deploying election contract -----------");
  const election = await deploy("Election", {
    from: deployer,
    args: arguments,
    log: true,
  });
  log("contract deployed at address :- ", election.address);
};

module.exports.tags = ["all", "election"];
