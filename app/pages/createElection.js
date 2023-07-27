import { Button } from "@/components/componentIndex";
import styles from "../styles/createElection.module.css";
import { useState } from "react";

export default function createElection() {
  const [showCandidate, setShowCandidate] = useState(false);

  return (
    <div className={styles.createElection}>
      <div className={styles.createElection_container}>
        <div className={styles.createElection_header}>
          <h3 style={{ borderBottom: !showCandidate && "4px solid #4c5773" }}>
            Register Yourself
          </h3>
          <h3 style={{ borderBottom: showCandidate && "4px solid #4c5773" }}>
            Add Candidates
          </h3>
        </div>
        {!showCandidate ? (
          <div className={styles.createElection_registration}>
            <form action="/createElecton" method="post">
              <label>Your Wallet Address</label>
              <input placeholder="0x12345" disabled={true} />
              <label>Your Name</label>
              <input placeholder="Enter your name" type="text" />
              <label>Your Position</label>
              <input
                placeholder="Enter your position in organisation"
                type="text"
              />
              <label>Election Title</label>
              <input placeholder="What's this election for" />
            </form>

            <Button
              handleClick={() => setShowCandidate(true)}
              innerText="Add Candidates -->"
            />
          </div>
        ) : (
          <div className={styles.createElection_addcandidate}>
            <form>
              <label>wallet Address </label>
              <input value="0x12345" disabled={true} />
              <label>Candidate Name </label>
              <input
                placeholder="Enter Candaidate's Name"
                type="text"
                required={true}
              />
              <label>Party's name </label>
              <input
                placeholder="Enter candidate's party name"
                type="text"
                required={true}
              />
              <label>Party's Slogan </label>
              <input
                placeholder="Enter party's slogan"
                type="text"
                required={true}
              />
            </form>
            <div className={styles.candidates_button}>
              <div>
                <Button innerText="Add Candidate" />
                <Button
                  handleClick={() => setShowCandidate(false)}
                  innerText="<--- Back"
                />
              </div>
              <Button innerText="Start Election" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
