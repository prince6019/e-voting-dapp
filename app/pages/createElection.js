import { Button, deploy } from "@/components/componentIndex";
import styles from "../styles/createElection.module.css";
import { useState } from "react";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Election from "../artifacts/contracts/Election.sol/Election";
import { useRouter } from "next/router";
import buttonStyle from "../components/Button/Button.module.css";
import { AiOutlineClose } from "react-icons/ai";

export default function createElection() {
  // useState hooks
  // election registering hooks
  const [adminName, setAdminName] = useState("");
  const [adminPosition, setAdminPosition] = useState("");
  const [electionTitle, setElectionTitle] = useState("");
  const [organizationTitle, setOrganizationTitle] = useState("");

  // addcandidates hooks
  const [candidates, setcandidates] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [candidatePartyName, setCandidatePartyName] = useState("");
  const [candidatePartySlogan, setCandidatePartySlogan] = useState("");

  // thirdweb variables
  const address = useAddress();
  const signer = useSigner();
  const router = useRouter();

  // handle add candidate in form
  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (
      candidateName === "" ||
      candidatePartyName === "" ||
      candidatePartySlogan === ""
    ) {
      console.error("please fill all the inputs");
    } else {
      const obj = {
        candidateName: candidateName,
        candidatePartyName: candidatePartyName,
        candidatePartySlogan: candidatePartySlogan,
      };
      setcandidates((candidate) => [...candidate, obj]);
      console.log("candidate added!");

      setCandidateName("");
      setCandidatePartyName("");
      setCandidatePartySlogan("");
    }
  };

  //deploy election contract
  const newContract = async () => {
    if (signer == null || signer == undefined) {
      return;
    }
    if (
      adminPosition === "" ||
      adminName === "" ||
      electionTitle === "" ||
      organizationTitle === ""
    ) {
      alert("please fill all inputs in election register");
      console.error("please fill all inputs in election register");
      return;
    }
    if (candidates.length <= 1) {
      alert("Add atleast 2 canidates");
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
      router.push({
        pathname: "/election/[contractAddress]",
        query: {
          contractAddress: electionContract.address,
          data: JSON.stringify(candidates),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.createElection}>
      <div className={styles.createElection_container}>
        <h3 className={styles.register_header}>Register Yourself</h3>
        <div className={styles.createElection_registration}>
          <form type="Submit" action="/createElecton" method="post">
            <label>
              Your Wallet Address
              <input
                placeholder={address || "please connect your wallet"}
                disabled
                type="text"
              />
            </label>
            <label>
              Your Name
              <input
                placeholder="Enter your name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                type="text"
                id="adminName"
                required
              />
            </label>
            <label>
              Job title or Position
              <input
                placeholder="Enter your position in organisation"
                type="text"
                value={adminPosition}
                onChange={(e) => setAdminPosition(e.target.value)}
                id="adminPosition"
                required
              />
            </label>
            <label>
              Election Title
              <input
                placeholder="What's this election for"
                type="text"
                onChange={(e) => setElectionTitle(e.target.value)}
                value={electionTitle}
                id="electionTitle"
                required
              />
            </label>
            <label>
              organization title
              <input
                placeholder="Eg AIACTR"
                type="text"
                value={organizationTitle}
                onChange={(e) => setOrganizationTitle(e.target.value)}
                required
              />
            </label>
          </form>
        </div>
        <h3 className={styles.addcandidate_header}>Add Candidates</h3>

        {candidates.map((candidate, i) => {
          return (
            <div className={styles.candidate_created} key={i}>
              <AiOutlineClose
                className={styles.close_icon}
                onClick={() =>
                  setcandidates((candidates) => candidates.splice(i, 1))
                }
              />
              <p>Candidate No. {i} </p>
              <p>{candidate.candidateName} </p>
              <p>{candidate.candidatePartyName} </p>
              <p>{candidate.candidatePartySlogan}</p>
            </div>
          );
        })}

        <div className={styles.createElection_addcandidate}>
          <form type="submit">
            <label>
              wallet Address
              <input value="0x12345" disabled />
            </label>
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
              className={buttonStyle.button}
              type="submit"
              onClick={(e) => handleAddCandidate(e)}
            >
              {" "}
              Add candidate
            </button>
          </form>
        </div>
        <button className={buttonStyle.button} onClick={() => newContract()}>
          deploy Election
        </button>
      </div>
    </div>
  );
}
