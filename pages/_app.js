import "../styles/globals.css";
import { Nav } from "@components/Nav";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> 中山大学算法超市 </title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="h-full">
        <Nav />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
