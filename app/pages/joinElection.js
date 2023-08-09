import { useEffect } from "react";
import styles from "../styles/joinElection.module.css";
import Link from "next/link";
import axios from "axios";

export default function joinElection() {
  useEffect(() => {
    axios
      .get("/joinElection")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <div className={styles.joinelection}>
      <div className={styles.joinelection_container}>
        <h1>🟢 Ongoing Elections</h1>
        <Link href="/electionList" className={styles.electionlist}>
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
}
