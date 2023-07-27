import React, { useState } from "react";
import styles from "./Doubts.module.css";

const Doubts = () => {
  const [q1, setQ1] = useState(true);
  const [q2, setQ2] = useState(true);
  const [q3, setQ3] = useState(true);
  const [q4, setQ4] = useState(true);

  return (
    <div className={styles.doubts}>
      <div className={styles.doubts_container}>
        <h1>Your Questions Answered</h1>
        <div className={styles.doubts_qna}>
          <div className={styles.doubts_content}>
            <h1 onClick={() => setQ1(() => !q1)}>
              How does the registration process work?
            </h1>
            <p hidden={q1}>
              The registration is simple and quick. You just need to provide
              some personal information, verify your identity, and you’re good
              to go! The next elections are only a few clicks away.
            </p>
          </div>
          <div className={styles.doubts_content}>
            <h1 onClick={() => setQ2(() => !q2)}>
              Is my vote really secure & private?
            </h1>
            <p hidden={q2}>
              Absolutely! We use the power of web3 technology and top-notch
              encryption methods to ensure the security and privacy of
              everyone’s vote. You can trust us with your vote.
            </p>
          </div>
          <div className={styles.doubts_content}>
            <h1 onClick={() => setQ3(() => !q3)}>
              Is my vote really secure & private?
            </h1>
            <p hidden={q3}>
              Absolutely! We use the power of web3 technology and top-notch
              encryption methods to ensure the security and privacy of
              everyone’s vote. You can trust us with your vote.
            </p>
          </div>
          <div className={styles.doubts_content}>
            <h1 onClick={() => setQ4(() => !q4)}>
              Is my vote really secure & private?
            </h1>
            <p hidden={q4}>
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
