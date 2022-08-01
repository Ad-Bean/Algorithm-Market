import "../styles/globals.css";
import { Nav } from "@components/Nav";
import Head from "next/head";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setUserId(userId);
    } else {
    }
  }, [userId]);

  return (
    <>
      <Head>
        <title> 中山大学算法超市 </title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="h-full">
        <Nav userId={userId} />
        <Component {...pageProps} userId={userId} setUserId={setUserId} />
      </div>
    </>
  );
}

export default MyApp;
