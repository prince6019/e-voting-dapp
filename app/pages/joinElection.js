import { useEffect, useState } from "react";
import styles from "../styles/joinElection.module.css";
import Link from "next/link";
import axios from "axios";
import Election from "../artifacts/contracts/Election.sol/Election";
import { ethers } from "ethers";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { buttonStyles } from "@/components/componentIndex";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

export default function joinElection() {
  const [electionlist, setElectionList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [voterPhone, setVoterPhone] = useState("");
  const [voterAadhar, setVoterAadhar] = useState("");
  const [electionAddress, setElectionAddress] = useState("");

  const signer = useSigner();
  const address = useAddress();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8080/joinElection")
      .then((res) => {
        console.log(res.data);
        setElectionList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRegister = async (index, contractAddress) => {
    const button = document.getElementById(`button${index}`);
    console.log(button);
    console.log("index of contract to be registered", index);
    setElectionAddress(contractAddress);
    const contract = new ethers.Contract(contractAddress, Election.abi, signer);
    if (button.innerHTML === "Vote") {
      router.push(`election/${contractAddress}`);
      return;
    }
    const res = await contract.getVoterDetails(address);
    console.log(res);
    if (res.hasVoted) {
      alert("you already has voted in this election!");
      button.innerHTML = "already voted";
      button.disabled = true;
      return;
    }
    if (res.isRegistered && !res.isVerified) {
      alert("please wait till you get verififed by the admin");
      return;
    }
    if (res.isRegistered && res.isVerified) {
      button.innerHTML = "Vote";
      return;
    }
    setShowModal(true);
  };

  const handleVoterRegistration = async (e) => {
    e.preventDefault();
    setShowModal(false);
    if (voterAadhar === "" || voterPhone === "") {
      alert("please fill out all the given fields");
      return;
    }
    const contract = new ethers.Contract(electionAddress, Election.abi, signer);
    try {
      const tx = await contract.registerVoter(voterAadhar, voterPhone);
      await tx.wait(1);
      console.log("voter registered successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.joinelection}>
      <div className={styles.joinelection_container}>
        <h1>🟢 Ongoing Elections</h1>
        <Link href="/electionList" className={styles.electionlist}>
          <h3>View All Elections</h3>
        </Link>

        {electionlist.map((item, i) => {
          return (
            <div className={styles.election_details} key={i}>
              <div>
                <p>Admin :---- </p>
                {/* <p>Address : {item?.admin.walletAddress}</p>
              <p>Name : {item?.admin.name}</p> */}
              </div>
              <div>
                <p>election Title : {item?.electionTitle}</p>
                <p>No. of candidates : {item?.candidates.length}</p>
                <p></p>
              </div>
              <button
                id={`button${i}`}
                className={buttonStyles.button}
                onClick={() => handleRegister(i, item.contractAddress)}
              >
                {" "}
                register
              </button>
            </div>
          );
        })}
        <div className={styles.register_modal}></div>
        {showModal && (
          <div className={styles.modal_box}>
            <dialog open>
              <AiOutlineClose
                className={styles.close_icon}
                onClick={() => setShowModal(false)}
              />
              <form className={styles.registration_form}>
                <div>
                  <label>Your wallet Address</label>
                  <input value={address} disabled />
                </div>
                <div>
                  <label>Your Phone Number</label>
                  <input
                    value={voterPhone}
                    onChange={(e) => setVoterPhone(e.target.value)}
                    type="number"
                    placeholder="phone Number"
                    required
                  />
                </div>
                <div>
                  <label>Your Aadhar Number</label>
                  <input
                    value={voterAadhar}
                    onChange={(e) => setVoterAadhar(e.target.value)}
                    type="number"
                    placeholder="Aadhar No."
                    required
                  />
                </div>
                <button
                  onClick={(e) => handleVoterRegistration(e)}
                  className={buttonStyles.button}
                >
                  register
                </button>
              </form>
            </dialog>
          </div>
        )}
      </div>
    </div>
  );
}
