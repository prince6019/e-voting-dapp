import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/election.module.css";
import { Button } from "@/components/componentIndex";

const contractAddress = () => {
  const router = useRouter();
  const { contractAddress, data } = router.query;
  console.log(contractAddress);
  console.log(data);
  return (
    <div className={styles.election}>
      <div className={styles.election_container}>
        <h2>{contractAddress}</h2>
        {data.map((candidate, i) => {
          <div className={styles.election_candidate} key={i}>
            <div>
              <p>{i}</p>
              <p>{candidate.candidateName}</p>
              <span>{candidate.candidatePartyName}</span>
            </div>
            <Button
              innerText="Vote"
              handleClick={() => console.log("0 voted")}
              link=""
            />
          </div>;
        })}
        {/* <div className={styles.election_candidate}>
          <div>
            <p>1</p>
            <p>Narendra damodar modi</p>
            <span>(BJP)</span>
          </div>
          <Button
            innerText="Vote"
            handleClick={() => console.log("0 voted")}
            link=""
          />
        </div>
        <div className={styles.election_candidate}>
          <div>
            <p>2</p>

            <p>Rahul gandhi</p>
            <span>(Congress)</span>
          </div>
          <Button
            innerText="Vote"
            handleClick={() => console.log("0 voted")}
            link=""
          />
        </div> */}
      </div>
    </div>
  );
};

export default contractAddress;
