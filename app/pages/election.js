import React from "react";
import styles from "../styles/election.module.css";
import Link from "next/link";
import { Button } from "@/components/componentIndex";

const election = () => {
  return (
    <div className={styles.election}>
      <div className={styles.election_container}>
        <div className={styles.election_candidate}>
          <div>
            <p>0</p>
            <p>Arvind kejriwal</p>
            <span>(AAP)</span>
          </div>
          <Button
            innerText="Vote"
            handleClick={() => console.log("0 voted")}
            link=""
          />
        </div>
        <div className={styles.election_candidate}>
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
        </div>
      </div>
    </div>
  );
};

export default election;
