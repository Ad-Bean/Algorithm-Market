import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "@components/Nav";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getUserInfo } from "@api/api";
import { UserInfo } from "@interfaces/UserInfo";

function MyApp({ Component, pageProps }: AppProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState<UserInfo | null>(null);

  const getInfo = async () => {
    const res = await getUserInfo();
    return res;
  };

  useEffect(() => {
    if (localStorage.getItem("user_email")) {
      setUserEmail(localStorage.getItem("user_email"));
      getInfo()
        .then((info) => {
          setInfo(info);
        })
        .catch((err) => {
          console.error(err);
          setMessage("发生错误");
        });
    } else {
      setUserEmail(null);
    }
  }, []);

  return (
    <>
      <Head>
        <title> 中山大学算法超市 </title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="h-full" onClick={() => setMessage("")}>
        <Nav
          info={info}
          setInfo={setInfo}
          setUserEmail={setUserEmail}
          message={message}
          setMessage={setMessage}
        />
        <Component
          {...pageProps}
          info={info}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setInfo={setInfo}
        />
      </div>
    </>
  );
}

export default MyApp;
