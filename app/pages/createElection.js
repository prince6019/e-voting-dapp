import { AddCandidate, AdminRegistration } from "@/components/componentIndex";
import styles from "../styles/createElection.module.css";
import { useEffect, useState } from "react";

export default function createElection() {
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    const contract = localStorage.getItem("contractAddress");
    setContractAddress(contract);
  });

  return (
    <div className={styles.createElection}>
      <div className={styles.createElection_container}>
        {!contractAddress ? (
          <AdminRegistration setContractAddress={setContractAddress} />
        ) : (
          <AddCandidate contractAddress={contractAddress} />
        )}
      </div>
    </div>
  );
}
