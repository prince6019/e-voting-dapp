import styles from "../styles/electionList.module.css";
import Link from "next/link";

export default function electionList() {
  return (
    <div className={styles.electionlist}>
      <div className={styles.electionlist_container}>
        <h1>🟢 Ongoing Elections</h1>
        <Link href="/totalElection" className={styles.electionlist}>
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
