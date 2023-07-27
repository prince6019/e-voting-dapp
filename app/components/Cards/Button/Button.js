import React from "react";
import styles from "./Button.module.css";
const Button = ({ innerText, handleClick }) => {
  return (
    <button className={styles.button} onClick={() => handleClick()}>
      {innerText}{" "}
    </button>
  );
};

export default Button;
