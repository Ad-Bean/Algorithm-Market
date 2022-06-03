import "../styles/globals.css";
import { Nav } from "../components/Nav";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title> 中山大学算法超市 </title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
