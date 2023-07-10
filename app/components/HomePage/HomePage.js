import React from "react";
import styles from "./HomePage.module.css";
import Image from "next/image";
import { voting_people } from "@/img";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage_container}>
        <div className={styles.homepage_container_banner}>
          <div className={styles.homepage_content}>
            <h1>Revolutionize your voting experience!</h1>
            <button>Register Now</button>
            <button>Connect Wallet</button>
          </div>
          <Image
            className={styles.homepage_image}
            src={voting_people}
            height={600}
            width={900}
            alt="voting people picture"
          />
        </div>
        <div className={styles.homepage_container_box}>
          <h1>Welcome to Online Voting System</h1>
          <p>
            Discover the new era of online voting with our platform. Say goodbye
            to the old-fashioned voting booths and lines. Our system guarantees
            a fast, secure, and reliable voting experience for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
