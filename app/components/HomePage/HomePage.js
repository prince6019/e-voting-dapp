import React from "react";
import styles from "./HomePage.module.css";
import { Button } from "../componentIndex";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage_container}>
        <div className={styles.homepage_container_banner}>
          <div className={styles.background_shade}></div>
          <div className={styles.homepage_content}>
            <h1>Revolutionize your voting experience!</h1>
            <Button innerText="Create Election" />
            <Button innerText="Connect wallet" />
          </div>
        </div>
        <div className={styles.homepage_container_box}>
          <h1>Want to start a New Election? Go Ahead </h1>
          <Button className={styles.box_button} innerText="Create Election" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
