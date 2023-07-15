import React from "react";
import styles from "./Footer.module.css";
import { MdHowToVote } from "react-icons/md";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <MdHowToVote className={styles.voteicon} />
        <p>©️ 2023 online voting system</p>
        <p>made with ❤️️ by Prince sharma</p>
      </div>
    </div>
  );
};

export default Footer;
