import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { vote_img } from "@/img";
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar_container_top}>
          <div>
            <Image src={vote_img} height={40} width={40} />
            <h3> BlockVote</h3>
          </div>
          <ConnectWallet theme="light" />
        </div>
        <div className={styles.navbar_container_bottom}>
          <h3>
            <Link className={styles.link} href="/registration">
              Registration
            </Link>
          </h3>
          <h3>
            <Link className={styles.link} href="verification">
              Verification
            </Link>
          </h3>
          <h3>
            <Link className={styles.link} href="election">
              Election
            </Link>
          </h3>
          <h3>
            <Link className={styles.link} href="results">
              Results
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
