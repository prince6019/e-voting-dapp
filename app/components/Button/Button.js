import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";
const Button = ({ innerText, handleClick, link }) => {
  return (
    <button className={styles.button} onClick={() => handleClick()}>
      <Link href={link}>{innerText} </Link>
    </button>
  );
};

export default Button;
