import React, { useState } from "react";
import SnackBar from "@components/SnackBar";
import SuccessSnackBar from "@components/SuccessSnackBar";
import { useRouter } from "next/router";
import Link from "next/link";
import { postSignin } from "@api/api";

export default function Signin({ userId, setUserId }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("邮箱或密码不能为空！");
    }

    const result = await postSignin(email, password);
    if (result.data.code === 40001) {
      setMessage(result.message);
    } else {
      setSuccess("登录成功，跳转中");
      setUserId(result.data.data.id);
      localStorage.setItem("user_id", result.data.data.id);
      router.push("/");
    }
  };

  return (
    <>
      {message ? <SnackBar message={message} /> : null}
      {success ? <SuccessSnackBar message={success} /> : null}
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
          <form
            noValidate=""
            onSubmit={login}
            className="space-y-12 ng-untouched ng-pristine ng-valid"
          >
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
                  <Link href="/signup">
                    <a
                      rel="noopener noreferrer"
                      className="text-xs hover:underline dark:text-gray-400"
                    >
                      忘记密码？
                    </a>
                  </Link>
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
                  type="submit"
                  className="transition duration-200 hover:bg-violet-600 w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-200"
                >
                  登 录
                </button>
              </div>
              <p className="px-10 w-full text-sm text-center dark:text-gray-400">
                还没有账号？{" "}
                <Link href="/signup">
                  <a rel="noopener noreferrer" className="hover:underline dark:text-violet-400">
                    注册账号
                  </a>
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
