import React from "react";
import styles from "./Doubts.module.css";

const Doubts = () => {
  return (
    <div className={styles.douts}>
      <div className={styles.doubts_container}>
        <h1>Your Questions Answered</h1>
        <div className={styles.doubts_qna}>
          <div>
            <h1>How does the registration process work?</h1>
            <p>
              The registration is simple and quick. You just need to provide
              some personal information, verify your identity, and you’re good
              to go! The next elections are only a few clicks away.
            </p>
          </div>
          <div>
            <h1>Is my vote really secure & private?</h1>
            <p>
              Absolutely! We use the power of web3 technology and top-notch
              encryption methods to ensure the security and privacy of
              everyone’s vote. You can trust us with your vote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doubts;
