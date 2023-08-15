import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/election.module.css";
import { buttonStyles } from "@/components/componentIndex";
import Election from "../../artifacts/contracts/Election.sol/Election";
import { ethers } from "ethers";
import { useAddress, useSigner } from "@thirdweb-dev/react";

const contractAddress = () => {
  const signer = useSigner();
  const router = useRouter();
  const address = useAddress();

  const [contractInstance, setContractInstance] = useState();
  const [candidates, setCandidates] = useState([]);

  console.log("query : ", router.query);

  useEffect(() => {
    if (!router.query || !signer) {
      return;
    }
    const func = async () => {
      try {
        const electionContract = new ethers.Contract(
          router.query?.contractAddress,
          Election.abi,
          signer
        );
        setContractInstance(electionContract);
        const candidates = await electionContract.getCandidate();
        console.log(candidates);
        setCandidates(candidates);
      } catch (error) {
        console.log(error);
      }
      localStorage.clear();
    };
    func();
  }, [router.query.contractAddress, signer]);

  const handleVote = async (i) => {
    console.log(contractInstance);
    try {
      const endTime = await contractInstance.getEndTime();
      if (endTime <= Date.now() / 1000) {
        alert("election has been Ended");
        // router.push("/");
        return;
      }
    } catch (error) {
      console.log(error);
    }
    const hasVoted = await contractInstance.getVoterDetails(address);
    if (hasVoted) {
      alert(
        "you already has voted , so please do not waste your time in trying again !!"
      );
      return;
    }
    console.log(i);
    try {
      const tx = await contractInstance.Vote(i);
      await tx.wait(1);
      console.log(i, "voted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.election}>
      <div className={styles.election_container}>
        <h2>{contractAddress}</h2>

        {candidates.map((candidate, i) => {
          return (
            <div className={styles.election_candidate} key={i}>
              <div>
                <p>{i}</p>
                <p>{candidate?.name}</p>
                <span>{candidate?.partyName}</span>
                <span>{candidate?.slogan}</span>
              </div>
              <button
                className={buttonStyles.button}
                onClick={() => handleVote(i)}
              >
                Vote
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default contractAddress;
