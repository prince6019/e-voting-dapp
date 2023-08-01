const { network, ethers, deployments, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { assert, expect } = require("chai");
const { keccak256, formatBytes32String } = require("ethers/lib/utils");

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
          ).to.be.revertedWithCustomError(Election, "Election_NotAdmin");
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

      describe("register voter", () => {
        it("register as a voter and store in voterDetails mapping", async () => {
          const aadhar = "510184529726";
          const phoneNO = "9971088480";
          await Election.registerVoter(aadhar, phoneNO);
          const voterdetail = await Election.getVoterDetails(deployer);

          assert.equal(voterdetail.voter, deployer);
        });

        it("should emit the event too", async () => {
          const electionRegister = await Election.registerVoter(
            "510184529726",
            "9971088480"
          );
          expect(electionRegister).to.emit("Election", "VoterRegistered");
        });
      });

      describe("verify", () => {
        beforeEach(async () => {
          await Election.registerVoter("510184529726", "9971088480");
        });

        it("should not revert if the voter is already verified", async () => {
          await Election.verifyVoter(deployer, true);
          const [voter, dataHash, isRegistered, isVerified, hasVoted] =
            await Election.getVoterDetails(deployer);
          assert.equal(isVerified, true);
        });
      });

      describe("vote", () => {
        beforeEach(async () => {
          await Election.addCandidate(
            "kejriwal",
            "AAP",
            "Na jeeyenge na jeene denge"
          );
          await Election.registerVoter("510184529726", "9971088480");
        });
        it("should revert if voter is not verified", async () => {
          await expect(Election.Vote(0)).to.be.revertedWithCustomError(
            Election,
            "Election_VoterNotVerified"
          );
        });

        it("should revert if election is not initiated", async () => {
          await Election.verifyVoter(deployer, true);
          await expect(Election.Vote(0)).to.be.revertedWithoutReason();
        });

        it("should increases the number of votes of the candidate", async () => {
          await Election.initiateElection();
          await Election.verifyVoter(deployer, true);

          await Election.Vote(0);
          const [name, partyName, slogan, votes] =
            await Election.getCandidateDetails(0);
          const [voter, dataHash, isRegistered, isVerified, hasVoted] =
            await Election.getVoterDetails(deployer);
          assert.equal(votes, 1);
          assert.equal(hasVoted, true);
        });
      });
    });
