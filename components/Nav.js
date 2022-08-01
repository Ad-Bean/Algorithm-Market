import Icon from "./icons/Icon";
import Link from "next/link";
import Image from "next/image";
import SnackBar from "@components/SnackBar";
import { useEffect, useState } from "react";
import { getUserInfo } from "@api/api";

export const Nav = (props) => {
  const { userId, setUserId, message, setMessage } = props;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const res = await getUserInfo();
      return res;
    };

    if (userId) {
      getInfo()
        .then((info) => {
          setInfo(info);
        })
        .catch((err) => {
          console.error(err);
          setMessage("发生错误");
        });
    }
  }, [setMessage, userId]);

  const logout = () => {
    localStorage.removeItem("user_id");
    setUserId();
  };

  return (
    <>
      {message ? <SnackBar message={message} /> : null}
      <div className="sticky h-16 top-0 z-50 bg-white shadow-sm" onClick={() => setMessage("")}>
        <div className=" py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex items-center justify-between">
            <Link href="/">
              <a className="inline-flex items-center">
                <Icon />
                <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                  算法超市
                </span>
              </a>
            </Link>

            <ul className="flex items-center space-x-8 lg:flex">
              <li>
                <Link href="/algorithm">
                  <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                    算法
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/market">
                  <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                    超市
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                    价格
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                    关于
                  </a>
                </Link>
              </li>
              <li>
                {userId ? (
                  <div className="relative flex-shrink-0">
                    <Image
                      src={info.data.avatar || "https://source.unsplash.com/50x50/?portrait"}
                      alt="Avatar"
                      onClick={() => logout()}
                      width={32}
                      height={32}
                      className="hover:cursor-pointer w-12 h-12 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                    />
                  </div>
                ) : (
                  <Link href="/signin">
                    <a
                      className="inline-flex items-center justify-center h-8 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      aria-label="Sign in"
                      title="Sign in"
                    >
                      登录
                    </a>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
