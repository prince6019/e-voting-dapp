import { Button, deploy } from "@/components/componentIndex";
import styles from "../styles/createElection.module.css";
import { useState } from "react";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Election from "../artifacts/contracts/Election.sol/Election";

export default function createElection() {
  const [showCandidate, setShowCandidate] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminPosition, setAdminPosition] = useState("");
  const [electionTitle, setElectionTitle] = useState("");
  const [candidates, setcandidates] = useState([]);
  const address = useAddress();
  const signer = useSigner();

  const handleAddElectionDetails = async () => {
    const adminName = document.getElementById("adminName").value;
    setAdminName(adminName);
    const adminPosition = document.getElementById("adminPosition").value;
    setAdminPosition(adminPosition);
    const electionTitle = document.getElementById("electionTitle").value;
    setElectionTitle(electionTitle);
    console.log(adminName, adminPosition, electionTitle);
    setShowCandidate(true);
  };

  const handleAddCandidate = async () => {
    const obj = {
      candidateName: document.getElementById("candidateName").value,
      candidatePartyName: document.getElementById("canidatePartyName").value,
      candidateSlogan: document.getElementById("canidateSlogan").value,
    };
    setcandidates((candidate) => [...candidate, obj]);
    console.log("candidate added!");
  };

  const newContract = async () => {
    if (signer == null || signer == undefined) {
      return;
    }
    try {
      console.log("signer : ", signer);
      const election = new ethers.ContractFactory(
        Election.abi,
        Election.bytecode,
        signer
      );
      const electionContract = await election.deploy();
      console.log("election contract addresss : ", electionContract.address);
    } catch (e) {
      console.log(e);
    }
  };

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
              <input
                placeholder={address || "please connect your wallet"}
                disabled
                type="text"
              />
              <label>Your Name</label>
              <input
                placeholder="Enter your name"
                value={adminName}
                onChange={() => setAdminName(e.target.value)}
                type="text"
                id="adminName"
                required
              />
              <label>Your Position</label>
              <input
                placeholder="Enter your position in organisation"
                type="text"
                value={adminPosition}
                onChange={() => setAdminPosition(e.target.value)}
                id="adminPosition"
                required
              />
              <label>Election Title</label>
              <input
                placeholder="What's this election for"
                type="text"
                onChange={() => setElectionTitle(e.target.value)}
                value={electionTitle}
                id="electionTitle"
                required
              />
            </form>

            <Button
              handleClick={() => handleAddElectionDetails()}
              innerText="Next -->"
              link=""
            />
          </div>
        ) : (
          <div className={styles.createElection_addcandidate}>
            <form type="submit">
              <label>wallet Address </label>
              <input value="0x12345" disabled />
              <label>Candidate Name </label>
              <input
                placeholder="Enter Candaidate's Name"
                type="text"
                id="CandidateName"
                required
              />
              <label>Party's name </label>
              <input
                placeholder="Enter candidate's party name"
                type="text"
                id="candidatePartyName"
                required
              />
              <label>Party's Slogan </label>
              <input
                placeholder="Enter party's slogan"
                id="candidateSlogan"
                type="text"
                required
              />
            </form>
            <div className={styles.candidates_button}>
              <div>
                <Button
                  innerText="Add Candidate"
                  link=""
                  handleClick={() => handleAddCandidate()}
                />
                <Button
                  handleClick={() => {
                    setShowCandidate(false);
                  }}
                  innerText="<--- Back"
                  link=""
                />
              </div>
              <Button
                innerText="Start Election"
                link=""
                handleClick={() => newContract()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
