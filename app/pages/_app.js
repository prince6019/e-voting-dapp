import { Footer, Navbar } from "@/components/componentIndex";
import "@/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BlockVote</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThirdwebProvider activeChain="ethereum">
        <Navbar />
        <Component {...pageProps} />
      </ThirdwebProvider>
      {/* <Footer /> */}
    </>
  );
}
