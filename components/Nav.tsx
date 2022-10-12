/* eslint-disable @next/next/no-img-element */
import Icon from './icons/Icon';
import Link from 'next/link';
import Image from 'next/image';
import ErrorSnackBar from '@components/ErrorSnackBar';
import { useEffect, useState } from 'react';
import { userLogout } from '@api/api';
import { useRouter } from 'next/router';
import { UserInfo } from '@interfaces/UserInfo';
import SuccessSnackBar from './SuccessSnackBar';
import { toast } from 'react-toastify';

type Props = {
  info: UserInfo | null;
  setInfo: Function;
  setUserEmail: Function;
  message: string;
  setMessage: Function;
};

export const Nav = ({ info, setInfo, setUserEmail, message, setMessage }: Props) => {
  const router = useRouter();
  const userSettings = [{ label: '用户名' }, { label: '邮箱' }, { label: '设置', href: '' }];
  const [valid, setValid] = useState(true);

  const checkBase64 = (src: string) => {
    const _img = document.createElement('img');
    _img.src = src;
    // _img.onerror = () => {
    //   setValid(false);
    // };
  };

  const logout = async () => {
    localStorage.removeItem('user_email');
    setUserEmail(null);
    setInfo(null);
    const result = await userLogout();
    if (result.code === 200) {
      toast.success('登出成功！');
    }
  };

  useEffect(() => {
    checkBase64(info?.avatar!);
  }, [info]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link href="/">
                <a className="inline-flex items-center">
                  <Icon />
                  <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                    算法超市
                  </span>
                </a>
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav className="hidden md:block" aria-labelledby="header-navigation">
                <h2 className="sr-only" id="header-navigation">
                  Header navigation
                </h2>

                <ul className="flex items-center gap-6 text-base space-x-4">
                  <li>
                    <Link href="/algorithm">
                      <a className="font-medium tracking-wide text-gray-600 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        算法
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/market">
                      <a className="font-medium tracking-wide text-gray-600 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        超市
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing">
                      <a className="font-medium tracking-wide text-gray-600 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        价格
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a className="font-medium tracking-wide text-gray-600 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        关于
                      </a>
                    </Link>
                  </li>
                  <li>
                    {info ? (
                      <>
                        <div className="relative flex-shrink-0 mr-8">
                          <div className="hover:cursor-pointer flex items-center justify-center peer group">
                            <img
                              className="object-cover h-8 w-8 rounded-full border border-gray-400"
                              alt=""
                              src={
                                (valid && info.avatar) ||
                                'https://source.unsplash.com/50x50/?portrait'
                              }
                            />
                            <ul className="drop-down w-32 invisible peer-hover:visible group-hover:visible transition-all ease-in-out absolute top-11 z-50 shadow-indigo-500/40 -left-12 text-base text-[#838c96] rounded-sm antialiased border-[#e7ebf0] bg-white border">
                              {userSettings.map((setting, idx) => (
                                <li
                                  key={idx}
                                  className="text-center tracking-wider my-1 py-2 leading-none px-4 cursor-pointer   overflow-hidden hover:bg-[#f4f6fb] hover:text-[#40454d] text-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (setting.label === '设置') {
                                      router.push('/settings');
                                    }
                                  }}
                                >
                                  {setting.label}

                                  {setting.label === '用户名' && (
                                    <>
                                      <br />
                                      <span className="text-xs text-[10px]">
                                        {info?.username || 'username'}
                                      </span>
                                    </>
                                  )}

                                  {setting.label === '邮箱' && (
                                    <>
                                      <br />
                                      <span className="text-xs text-[10px]">
                                        {info?.email || 'email@email.com'}
                                      </span>
                                    </>
                                  )}
                                </li>
                              ))}
                              <li
                                onClick={() => logout()}
                                className="text-center whitespace-nowrap tracking-wider my-1 py-2 leading-none px-4 cursor-pointer hover:bg-[#f4f6fb] hover:text-[#40454d] text-sm"
                              >
                                退出
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
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
              </nav>
              <div className="block md:hidden">
                <button className="p-2 text-gray-600 transition rounded hover:text-indigo-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
