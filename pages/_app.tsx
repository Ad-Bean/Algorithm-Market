import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "@components/Nav";
import Head from "next/head";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      setUserId(Number(localStorage.getItem("user_id")));
    } else {
      setUserId(null);
    }
  }, []);

  return (
    <>
      <Head>
        <title> 中山大学算法超市 </title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="h-full" onClick={() => setMessage("")}>
        <Nav userId={userId} setUserId={setUserId} message={message} setMessage={setMessage} />
        <Component {...pageProps} userId={userId} setUserId={setUserId} />
      </div>
    </>
  );
}

export default MyApp;
