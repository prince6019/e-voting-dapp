import React from "react";
import styles from "./Cards.module.css";
import Image from "next/image";
import { image1, image2, image3 } from "@/img";

const Cards = () => {
  return (
    <div className={styles.cards}>
      <div className={styles.cards_container}>
        <div>
          <h1>Secure</h1>
          <p>State-of-the-art security measures</p>
          <Image
            alt="image1"
            src={image1}
            className={styles.image1}
            height={300}
          />
        </div>
        <div>
          <h1>Accessible</h1>
          <p>Vote anytime, anywhere</p>
          <Image
            alt="imag32"
            src={image2}
            height={200}
            className={styles.image2}
          />
        </div>
        <div>
          <h1>Transparent</h1>
          <p>Verifiable voting process</p>
          <Image
            className={styles.image3}
            alt="image3"
            src={image3}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
