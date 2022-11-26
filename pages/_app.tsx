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
  const [userEmail, setUserEmail] = useState<string>('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState<UserInfo>();

  useEffect(() => {
    const user_email = localStorage.getItem('user_email');
    if (user_email) {
      setUserEmail(user_email);
      // http cannot set cookie
      getUserInfo()
        .then((res) => {
          if (res.data.code === 401) {
            toast.error('登录失败');
            return;
          } else {
            setInfo(res.data.data);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('发生错误');
        });
    } else {
      setUserEmail('');
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
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          message={message}
          setMessage={setMessage}
        />
        <Component
          {...pageProps}
          info={info}
          setInfo={setInfo}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      </div>
    </>
  );
}

export default MyApp;
