import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { HomePage } from "@/components/componentIndex";
import Cards from "@/components/Cards/Cards";
import Doubts from "@/components/doubts/Doubts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
