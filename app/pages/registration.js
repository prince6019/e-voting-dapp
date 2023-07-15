import React from "react";
import styles from "../styles/registration.module.css";

export default function registration() {
  return (
    <div className={styles.registration}>
      <div className={styles.registration_container}>
        <h2>Register Yourself</h2>
        <form className={styles.registration_form}>
          <div>
            <label>Your Phone Number</label>
            <input type="number" placeholder="phone Number" required />
          </div>
          <div>
            <label>Your wallet Address</label>
            <input value="0xfwflkadfnasklnasklaas1m12kl3" />
          </div>
          <div>
            <label>Your Aadhar Number</label>
            <input type="number" placeholder="Aadhar No." required />
          </div>
          <button className={styles.button}>register</button>
        </form>
      </div>
    </div>
  );
}
