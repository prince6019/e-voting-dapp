import { useEffect } from "react";
import styles from "../styles/electionList.module.css";
import axios from "axios";

export default function electionList() {
  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/electionList")
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="electionList">
      <div className={styles.electionList_container}></div>{" "}
    </div>
  );
}
