import React, { useState } from "react";
import styles from "./AdminRegistration.module.css";
import buttonStyles from "../Button/Button.module.css";
import Election from "../../artifacts/contracts/Election.sol/Election";
// external import ---
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import ReactLoading from "react-loading";
import axios from "axios";

const AdminRegistration = ({ setContractAddress }) => {
  // third web hooks
  const signer = useSigner();
  const address = useAddress();

  //   registration hooks
  const [adminName, setAdminName] = useState("");
  const [adminPosition, setAdminPosition] = useState("");
  const [adminAadhar, setAdminAadhar] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [electionTitle, setElectionTitle] = useState("");
  const [organizationTitle, setOrganizationTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const deployContract = async (e) => {
    e.preventDefault();
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
      return;
    }

    try {
      setLoading(true);
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
      await electionContract.deployTransaction.wait(1);
      console.log("election contract addresss : ", electionContract.address);
      localStorage.setItem("contractAddress", electionContract.address);
      setContractAddress(electionContract.address);

      axios
        .post("/createElection", {
          contractAddress: electionContract.address,
          adminName: adminName,
          adminAddress: address,
          electionTitle: electionTitle,
          organizationTitle: organizationTitle,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.adminRegistration}>
      {loading && (
        <div className={styles.react_loading_box}>
          <ReactLoading
            type="spinningBubbles"
            color="#4c5773"
            height={667}
            width={335}
            className={styles.react_loading}
          />
        </div>
      )}
      <div className={styles.adminRegistration_container}>
        <h3 className={styles.register_header}>Register Yourself</h3>

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
          <button
            className={`${buttonStyles.button} ${buttonStyles.deployButton}`}
            onClick={(e) => deployContract(e)}
          >
            deploy contract{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
