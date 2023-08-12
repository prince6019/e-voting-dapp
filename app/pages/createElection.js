import { AddCandidate, AdminRegistration } from "@/components/componentIndex";
import styles from "../styles/createElection.module.css";
import { useState } from "react";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function createElection() {
  // thirdweb variables
  const address = useAddress();
  const signer = useSigner();
  const router = useRouter();

  const [contractAddress, setContractAddress] = useState("");
  // handle add candidate in form

  //deploy election contract
  // const newContract = async () => {
  //   setLoading(true);

  //   try {
  //     console.log("signer : ", signer);

  //     candidates.forEach(async (item) => {
  //       const tx = await electionContract.addCandidate(
  //         item.candidateName,
  //         item.candidatePartyName,
  //         item.candidatePartySlogan
  //       );
  //       await tx.wait(1);
  //     });
  //     const tx1 = await electionContract.initiateElection();
  //     await tx1.wait(1);
  //     const startTime = await electionContract.getStartTime();
  //     console.log("start time :", startTime);
  //     const endTime = await electionContract.getEndTime();
  //     console.log("end time :", endTime);
  //     const interval = BigInt(endTime) - BigInt(startTime);
  //     console.log(interval);

  //     axios
  //       .post("/createElection", {
  //         contractAddress: electionContract.address,
  //         candidates: candidates,
  //         adminName: adminName,
  //         adminAddress: address,
  //         electionTitle: electionTitle,
  //         organizationTitle: organizationTitle,
  //         isEndElection: false,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     router.push({
  //       pathname: `/election/${electionContract.address}`,
  //       query: {
  //         data: JSON.stringify(candidates),
  //       },
  //     });
  //     setLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
