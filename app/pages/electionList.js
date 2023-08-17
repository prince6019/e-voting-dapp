import { useEffect, useState } from "react";
import styles from "../styles/electionList.module.css";
import axios from "axios";

export default function electionList() {
  const [electionArray, setElectionArray] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/electionList")
        .then((res) => {
          console.log(res.data);
          setElectionArray(res.data);
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className={styles.electionList}>
      <div className={styles.electionList_container}>
        {electionArray.map((election, i) => {
          return (
            <div className={styles.election} key={i}>
              <div>
                <h3>{election.contractAddress}</h3>
                <h4>{election.electionTitle}</h4>
                <h4>{election.organizationTitle}</h4>
                <h4>{election.date}</h4>
              </div>
              {election.candidates.map((candidate, index) => {
                return (
                  <div key={index}>
                    <p>{candidate.name}</p>
                    <p>{candidate.partyName}</p>
                    <p>{candidate.slogan}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
}
