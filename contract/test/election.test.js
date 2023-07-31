const { network, ethers, deployments, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Election", () => {
      let Election, deployer, player;
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;

        const players = await ethers.getSigners();
        player = players[1];

        await deployments.fixture(["all"]);
        Election = await ethers.getContract("Election", deployer);
      });

      describe("constructor", () => {
        it("initializes the election correctly", async () => {
          const candidateCount = await Election.getCandidateCount();
          assert.equal(candidateCount.toString(), "1");
          assert.equal(deployer, await Election.getAdmin());
        });
      });

      describe("setElectionDetails", () => {
        it("set the election details", async () => {
          await Election.setElectionDetails(
            "prince",
            "HR",
            "college headboy election",
            "AIACTR college"
          );
          const electionDetails = await Election.getElectionDetails();
          assert.equal(electionDetails.adminName, "prince");
          assert.equal(electionDetails.adminPosition, "HR");
          assert.equal(
            electionDetails.electionTitle,
            "college headboy election"
          );
          assert.equal(electionDetails.organizationTitle, "AIACTR college");
        });

        it("emits the setElectiondetails event", async () => {
          const electionDetailsSet = await Election.setElectionDetails(
            "prince",
            "HR",
            "college headboy election",
            "AIACTR college"
          );
          await electionDetailsSet.wait(1);
          expect(electionDetailsSet).to.emit("Election", "electionAdded");
        });
      });

      describe("addCandidate", () => {
        it("other than admin calling function should revert", async () => {
          const playerElection = await Election.connect(player);

          await expect(
            playerElection.addCandidate(
              "kejriwal",
              "AAP",
              "Na jeeyenge na jeene denge"
            )
          ).to.be.reverted;
        });

        it("increases the candidate count", async () => {
          await Election.addCandidate(
            "Modi",
            "AAP",
            "Na jeeyenge na jeene denge"
          );
          const candidateCount = await Election.getCandidateCount();
          assert.equal(candidateCount.toString(), "2");
        });

        it("should emit the candidate added event", async () => {
          const candidateAdded = await Election.addCandidate(
            "Modi",
            "AAP",
            "Na jeeyenge na jeene denge"
          );
          expect(candidateAdded).to.emit("Election", "CandidateAdded");
        });
      });
    });
