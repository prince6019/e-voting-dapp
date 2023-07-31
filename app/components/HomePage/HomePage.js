import React from "react";
import styles from "./HomePage.module.css";
import { Button } from "../componentIndex";
import { ConnectWallet } from "@thirdweb-dev/react";

const HomePage = () => {
  const handleCreateElection = (e) => {
    console.log("entered in create election forms");
  };

  const handleJoinElection = () => {
    console.log("viewing ongoing election list");
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.homepage_container}>
        <div className={styles.homepage_container_banner}>
          <div className={styles.background_shade}></div>
          <div className={styles.homepage_content}>
            <h1>Revolutionize your voting experience!</h1>
            <Button
              innerText="Create Election"
              handleClick={() => handleCreateElection()}
              link="/createElection"
            />
            <Button
              innerText="Join Election"
              handleClick={() => handleJoinElection}
              link="/ongoingElection"
            />
          </div>
        </div>
        <div className={styles.homepage_container_box}>
          <h1>Want to start a New Election? Go Ahead </h1>
          <Button
            className={styles.box_button}
            innerText="Create Election"
            link="/createElection"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
