import React from "react";
import styles from "../styles/election.module.css";
import Link from "next/link";

const election = () => {
  return (
    <div className={styles.election}>
      <div className={styles.election_container}>
        <h1>🟢 Ongoing Elections</h1>
        <Link href="/electionList" className={styles.election_list}>
          <h3>View All Elections</h3>
        </Link>
        <div className={styles.election_details}>
          <div>
            <p>Admin : </p>
            <p>0xf13412dcdwfwr2fwvwrvwrv</p>
            <p>prince sharma</p>
          </div>
          <div>
            <p>election type : loksabha election</p>
            <p>No. of candidates : 3</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default election;
