import { Button, deploy } from "@/components/componentIndex";
import styles from "../styles/createElection.module.css";
import { useState } from "react";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Election from "../artifacts/contracts/Election.sol/Election";
import { useRouter } from "next/router";
import buttonStyle from "../components/Button/Button.module.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

export default function createElection() {
  // useState hooks
  // election registering hooks
  const [adminName, setAdminName] = useState("");
  const [adminPosition, setAdminPosition] = useState("");
  const [adminAadhar, setAdminAadhar] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
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

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (signer == null || signer == undefined) {
      return;
    }
    if (
      adminPosition === "" ||
      adminName === "" ||
      electionTitle === "" ||
      organizationTitle === "" ||
      adminAadhar === "" ||
      adminPhone === ""
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
      const electionContract = await election.deploy(
        adminName,
        adminPosition,
        adminAadhar,
        adminPhone,
        electionTitle,
        organizationTitle
      );
      console.log("election contract addresss : ", electionContract.address);
      candidates.forEach(async (item) => {
        const tx = await electionContract.addCandidate(
          item.candidateName,
          item.candidatePartyName,
          item.candidatePartySlogan
        );
        await tx.wait(1);
      });
      const tx1 = await electionContract.initiateElection();
      await tx1.wait(1);
      const startTime = await electionContract.getStartTime();
      console.log("start time :", startTime);
      const endTime = await electionContract.getEndTime();
      console.log("end time :", endTime);

      axios
        .post("/createElection", {
          contractAddress: electionContract.address,
          candidates: candidates,
          adminName: adminName,
          adminAddress: address,
          electionTitle: electionTitle,
          organizationTitle: organizationTitle,
          isEndElection: false,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      router.push({
        pathname: "/election/[contractAddress]",
        query: {
          contractAddress: electionContract.address,
          data: JSON.stringify(candidates),
        },
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.createElection}>
      <div className={styles.createElection_container}>
        {loading && <div className={styles.loading}> loading ...</div>}
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
              Admin's Aadhar No.{" "}
              <input
                placeholder="Please enter your 12 digit aadhar no."
                type="number"
                onChange={(e) => setAdminAadhar(e.target.value)}
                value={adminAadhar}
                required
              />
            </label>
            <label>
              Admin's Phone No.
              <input
                placeholder="please enter your phone number"
                type="number"
                onChange={(e) => setAdminPhone(e.target.value)}
                value={adminPhone}
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
