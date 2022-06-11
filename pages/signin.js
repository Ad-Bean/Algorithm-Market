import React, { useState } from "react";
import SnackBar from "@components/SnackBar";
import { useRouter } from "next/router";

export default function Signin({ user, setUser }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = () => {
    if (!email || !password) {
      setMessage("用户名或密码不能为空！");
    }

    setUser({
      user: email,
      password: password,
    });
    if (user) router.push("/");
  };

  return (
    <>
      {message ? <SnackBar message={message} /> : null}
      <div
        onClick={() => {
          if (message) setMessage("");
        }}
        className="flex justify-center px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      >
        <div className="shadow-lg w-[64rem] flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-100">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold"> 登录 </h1>
            <p className="text-sm dark:text-gray-500"> 中山大学 算法超市 </p>
          </div>
          <form noValidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  用户名
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-700"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    密码
                  </label>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs hover:underline dark:text-gray-400"
                  >
                    忘记密码？
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="button"
                  className="transition duration-200 hover:bg-violet-600 w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-200"
                  onClick={() => login()}
                >
                  登 录
                </button>
              </div>
              <p className="px-10 w-full text-sm text-center dark:text-gray-400">
                还没有账号？{" "}
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline dark:text-violet-400"
                >
                  注册账号
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
