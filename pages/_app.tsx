import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Nav } from '@components/Nav';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@api/api';
import { UserInfo } from '@interfaces/UserInfo';
import { toast, ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState<UserInfo | null>(null);

  const getInfo = async () => {
    const res = await getUserInfo();
    return res;
  };

  useEffect(() => {
    if (localStorage.getItem('user_email')) {
      setUserEmail(localStorage.getItem('user_email'));
      // http cannot set cookie
      // getInfo()
      //   .then((info) => {
      //     setInfo(info);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     toast.error('发生错误');
      //   });
    } else {
      setUserEmail(null);
    }
  }, []);

  return (
    <>
      <Head>
        <title> 中山大学算法超市 </title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-full">
        <ToastContainer
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
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
