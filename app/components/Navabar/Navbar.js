import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { vote_img } from "@/img";
import {
  useAddress,
  useChainId,
  useMetamask,
  useSigner,
} from "@thirdweb-dev/react";
import { buttonStyles } from "../componentIndex";
import axios from "axios";

const Navbar = () => {
  const address = useAddress();
  const connecWithMetamask = useMetamask();
  const signer = useSigner();
  const chainId = useChainId();

  // useEffect(() => {
  //   if (address !== undefined) {
  //     // axios
  //     //   .post("http://localhost:8080/", {
  //     //     address: address,
  //     //   })
  //     //   .then((res) => console.log(res))
  //     //   .error((error) => console.log(error));
  //     // signer.signMessage("this is nonce 854612");
  //   }
  // }, [address]);

  const handleUserConnection = async () => {
    const button = document.getElementById("connectionButton");
    if (button.innerHTML === "Connect Wallet") {
      connecWithMetamask();
    } else if (
      button.innerHTML ===
      `Sign In | ${address.slice(0, 4)} ... ${address.slice(-5)}`
    ) {
      const transactionCount = signer.getTransactionCount();
      let txnhash, payload;
      axios
        .get(
          `http://localhost:8080/user/${address}/nonce/${transactionCount}/chain/${chainId}`
        )
        .then((res) => {
          payload = res.data;
          console.log(res.data);
          signer.signMessage(res.data).then((sig) => {
            try {
              axios
                .post("http://localhost:8080/user", {
                  userAddress: address,
                  txnHash: sig,
                  message: payload,
                })
                .then((res) => {
                  console.log("received address", res);
                  if (res.data === address) {
                    button.innerHTML = `${address.slice(
                      0,
                      4
                    )} ... ${address.slice(-5)}`;
                  }
                })
                .catch((e) => console.log(e));
            } catch (e) {
              console.log(e);
            }
          });
          // console.log(txnhash);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar_container_top}>
          <div>
            <Image src={vote_img} height={40} width={40} />
            <Link href="/">
              <h3> BlockVote</h3>
            </Link>
          </div>
          <button
            id="connectionButton"
            className={buttonStyles.button}
            onClick={() => handleUserConnection()}
          >
            {address
              ? `Sign In | ${address.slice(0, 4)} ... ${address.slice(-5)}`
              : "Connect Wallet"}
          </button>
        </div>
        <div className={styles.navbar_container_bottom}>
          <h3>
            <Link className={styles.link} href="/registration">
              Registration
            </Link>
          </h3>
          <h3>
            <Link className={styles.link} href="/verification">
              Verification
            </Link>
          </h3>
          <h3>
            <Link className={styles.link} href="/election">
              Election
            </Link>
          </h3>
          <h3>
            <Link className={styles.link} href="/results">
              Results
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
