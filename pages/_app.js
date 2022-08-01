import "../styles/globals.css";
import { Nav } from "@components/Nav";
import Head from "next/head";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      setUserId(localStorage.getItem("user_id"));
    } else {
      setUserId();
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
