import "../styles/globals.css";
import { Nav } from "@components/Nav";
import Head from "next/head";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  return (
    <>
      <Head>
        <title> 中山大学算法超市 </title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="h-full">
        <Nav user={user} setUser={setUser} />
        <Component {...pageProps} user={user} setUser={setUser} />
      </div>
    </>
  );
}

export default MyApp;
