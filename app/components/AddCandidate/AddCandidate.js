import React, { useState } from "react";
import styles from "./AddCandidate.module.css";
import { AiOutlineClose } from "react-icons/ai";
import Election from "../../artifacts/contracts/Election.sol/Election";
import { useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import buttonStyles from "../Button/Button.module.css";

const AddCandidate = ({ contractAddress }) => {
  // addcandidates hooks
  const [candidates, setcandidates] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [candidatePartyName, setCandidatePartyName] = useState("");
  const [candidatePartySlogan, setCandidatePartySlogan] = useState("");

  // thirdWeb hooks
  const signer = useSigner();
  const electionContract = new ethers.Contract(
    contractAddress,
    Election.abi,
    signer
  );

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (
      candidateName === "" ||
      candidatePartyName === "" ||
      candidatePartySlogan === ""
    ) {
      console.error("please fill all the inputs");
      return;
    }

    const obj = {
      candidateName: candidateName,
      candidatePartyName: candidatePartyName,
      candidatePartySlogan: candidatePartySlogan,
    };

    setcandidates((candidate) => [...candidate, obj]);
    console.log("candidate added!");
    try {
      const tx = await electionContract.addCandidate(
        candidateName,
        candidatePartyName,
        candidatePartySlogan
      );
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }

    setCandidateName("");
    setCandidatePartyName("");
    setCandidatePartySlogan("");
  };

  const handleElection = async () => {
    const candidateCount = await electionContract.getCandidateCount();
    console.log("candidate Cont :", candidateCount);
    // if (candidateCount > 1) {
    //   const startElection = await electionContract.initiateElection();
    // }
  };

  return (
    <div className={styles.addCandidate}>
      <div className={styles.addCandidate_container}>
        <h3 className={styles.addcandidate_header}>Add Candidates</h3>

        <div className={styles.createElection_addcandidate}>
          <form type="submit">
            <label>
              Candidate Name
              <input
                placeholder="Enter Candaidate's Name"
                type="text"
                onChange={(e) => setCandidateName(e.target.value)}
                required
                value={candidateName}
              />
            </label>
            <label>
              Party's name
              <input
                placeholder="Enter candidate's party name"
                type="text"
                onChange={(e) => setCandidatePartyName(e.target.value)}
                required
                value={candidatePartyName}
              />
            </label>
            <label>
              Party's Slogan
              <input
                placeholder="Enter party's slogan"
                id="candidateSlogan"
                type="text"
                onChange={(e) => setCandidatePartySlogan(e.target.value)}
                required
                value={candidatePartySlogan}
              />
            </label>

            <button
              className={buttonStyles.button}
              type="submit"
              onClick={(e) => handleAddCandidate(e)}
            >
              {" "}
              Add candidate
            </button>
          </form>
        </div>
        <button onClick={handleElection}>start election</button>
        {candidates.map((candidate, i) => {
          return (
            <div className={styles.candidate_created} key={i}>
              <AiOutlineClose
                className={styles.close_icon}
                onClick={() =>
                  setcandidates((candidate) => {
                    return candidate.filter((_, index) => i !== index);
                  })
                }
              />
              <p>Candidate No. {i} </p>
              <p>{candidate.candidateName} </p>
              <p>{candidate.candidatePartyName} </p>
              <p>{candidate.candidatePartySlogan}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddCandidate;
