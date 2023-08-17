import React, { useState } from "react";
import styles from "./AddCandidate.module.css";
import buttonStyles from "../Button/Button.module.css";
import { useRouter } from "next/router";
import Election from "../../artifacts/contracts/Election.sol/Election";

// extenral inport -----
import { AiOutlineClose } from "react-icons/ai";
import { useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import ReactLoading from "react-loading";
import axios from "axios";

const AddCandidate = ({ contractAddress }) => {
  // addcandidates hooks
  const [candidates, setcandidates] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [candidatePartyName, setCandidatePartyName] = useState("");
  const [candidatePartySlogan, setCandidatePartySlogan] = useState("");
  const [candidateCount, setCandidateCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // thirdWeb hooks
  const signer = useSigner();
  const router = useRouter();
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
      alert("Please fill all the input fields");
      console.error("please fill all the inputs");
      return;
    }

    const obj = {
      name: candidateName,
      partyName: candidatePartyName,
      slogan: candidatePartySlogan,
    };

    try {
      setLoading(true);
      const tx = await electionContract.addCandidate(
        candidateName,
        candidatePartyName,
        candidatePartySlogan
      );
      await tx.wait(1);
      setcandidates((candidate) => [...candidate, obj]);
      setCandidateCount((count) => count + 1);
      console.log("candidate added!");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);

    setCandidateName("");
    setCandidatePartyName("");
    setCandidatePartySlogan("");
  };

  const handleElection = async () => {
    const candidateCount = await electionContract.getCandidateCount();
    console.log("candidate Cont :", candidateCount);
    if (candidateCount > 1) {
      const startElection = await electionContract.initiateElection();
      await startElection.wait(1);

      const res = await electionContract.getEndTime();
      const endTime = Number(res);
      axios
        .put("http://localhost:8080/createElection", {
          electionAddress: electionContract.address,
          candidates: candidates,
          endTime: endTime,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      router.push(`election/${electionContract.address}`);
    }
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
              className={` ${buttonStyles.button} ${buttonStyles.deployButton}`}
              type="submit"
              onClick={(e) => handleAddCandidate(e)}
              disabled={loading}
            >
              {" "}
              Add candidate
            </button>
          </form>
        </div>
        {candidateCount > 1 && (
          <button
            className={buttonStyles.button}
            style={{ marginLeft: "2rem" }}
            onClick={handleElection}
          >
            start election
          </button>
        )}
        {loading && (
          <ReactLoading
            type="spinningBubbles"
            color="#4c5773"
            height={50}
            width={50}
            className={styles.react_loading}
          />
        )}
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
