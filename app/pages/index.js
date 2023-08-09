import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { HomePage, Doubts, Cards } from "@/components/componentIndex";
import { useSigner } from "@thirdweb-dev/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const signer = useSigner();

  return (
    <div className={styles.home}>
      <div className={styles.home_container}>
        <HomePage />
        <Cards />
        <Doubts />
      </div>
    </div>
  );
}
