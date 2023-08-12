import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/election.module.css";
import { Button } from "@/components/componentIndex";
import Election from "../../artifacts/contracts/Election.sol/Election";
import { ethers } from "ethers";
import { useSigner } from "@thirdweb-dev/react";

const contractAddress = () => {
  const signer = useSigner();
  const router = useRouter();
  const { contractAddress, data } = router.query;
  console.log("contract address : ", contractAddress);
  const jsonData = JSON.parse(data);

  const handleVote = async (i) => {
    console.log(i);
    const electionContract = new ethers.Contract(
      contractAddress,
      Election.abi,
      signer
    );
    const tx = await electionContract.Vote(i);
    await tx.wait(1);
    console.log(i, "voted successfully");
  };
  return (
    <div className={styles.election}>
      <div className={styles.election_container}>
        <h2>{contractAddress}</h2>
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
