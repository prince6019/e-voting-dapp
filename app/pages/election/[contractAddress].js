import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/election.module.css";
import { Button } from "@/components/componentIndex";
import Election from "../../artifacts/contracts/Election.sol/Election";
import { ethers } from "ethers";
import { useSigner } from "@thirdweb-dev/react";

const contractAddress = () => {
  const signer = useSigner();
  const router = useRouter();
  const initialTime = 60; // 60 seconds = 1 minute
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const { contractAddress, data } = router.query;
  console.log("contract address : ", contractAddress);
  const jsonData = JSON.parse(data);

  // election contract instance ----
  const electionContract = new ethers.Contract(
    contractAddress,
    Election.abi,
    signer
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleVote = async (i) => {
    const endTime = await electionContract.getEndTime();
    if (endTime <= Date.now() / 1000) {
      alert("election has been Ended");
      return;
    }
    console.log(i);
    try {
      const tx = await electionContract.Vote(i);
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
        <p>Time Remaining: {formatTime(timeRemaining)}</p>

        {jsonData.map((candidate, i) => {
          return (
            <div className={styles.election_candidate} key={i}>
              <div>
                <p>{i}</p>
                <p>{candidate.candidateName}</p>
                <span>{candidate.candidatePartyName}</span>
              </div>
              <Button
                innerText="Vote"
                handleClick={() => handleVote(i)}
                link=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default contractAddress;
