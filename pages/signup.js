/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import SnackBar from "@components/SnackBar";
import SuccessSnackBar from "@components/SuccessSnackBar";
import { useRouter } from "next/router";
import Link from "next/link";
import Upload from "@icons/Upload";
import { postSignup } from "@api/api";

export default function Signup() {
  const router = useRouter();

  const [avatar, setAvatar] = useState(null);
  const [avatarb64, setAvatarb64] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("邮箱或密码不能为空！");
      return;
    }

    if (password != confirm) {
      setMessage("两次密码不一致！");
      return;
    }

    try {
      const result = await postSignup(username, email, password, avatarb64);
      if (result.code === 40001) {
        setMessage(result.message);
      } else {
        setSuccess("注册成功，跳转中");
        router.push("/signup");
      }
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <>
      {message ? <SnackBar message={message} /> : null}
      {success ? <SuccessSnackBar message={success} /> : null}
      <div
        className="flex justify-center px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10"
        onClick={() => {
          if (message) setMessage("");
        }}
      >
        <div className="shadow-lg w-[64rem] flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100">
          <div className="mb-6 text-center">
            <h1 className="my-0 text-4xl font-bold"> 注册 </h1>
          </div>
          <form
            noValidate=""
            onSubmit={signup}
            className="space-y-12 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                {avatar ? (
                  <div className="">
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="object-cover object-center w-32 h-32 mx-auto rounded bg-gray-500"
                    />
                    <label
                      htmlFor="avatar"
                      className="mx-auto mt-2 cursor-pointer flex w-32 max-w-lg flex-col items-center  border-2 bg-white p-0 text-center"
                    >
                      <p className="mt-0 text-sm text-gray-500 tracking-wide">重新上传</p>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                        name="avatar"
                        id="avatar"
                        className="hidden w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-700"
                        onChange={(e) => {
                          setAvatar(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <p className="block mb-2 text-sm">头像</p>
                    <label
                      htmlFor="avatar"
                      className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-indigo-400 bg-white p-6 text-center"
                    >
                      <Upload />
                      <p className="mt-2 text-sm text-gray-500 tracking-wide">
                        文件类型 PNG, JPG or GIF.{" "}
                      </p>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                        name="avatar"
                        id="avatar"
                        className="hidden w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-700"
                        onChange={(e) => {
                          setAvatar(e.target.files[0]);
                          const reader = new FileReader();
                          reader.readAsDataURL(e.target.files[0]);
                          reader.onloadend = () => {
                            setAvatarb64(reader.result);
                          };
                        }}
                      />
                    </label>
                  </>
                )}
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm">
                  用户名
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="leroy"
                  className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  邮箱
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-700 invalid:border-red-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    密码
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    重复密码
                  </label>
                </div>
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="*****"
                  value={confirm}
                  required
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                  className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="transition duration-200 hover:bg-violet-600 w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-200"
                >
                  注 册
                </button>
              </div>
              <p className="px-10 w-full text-sm text-center text-gray-400">
                已有账号？{" "}
                <Link href="/signin">
                  <a rel="noopener noreferrer" className="hover:underline text-violet-400">
                    登录账号
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
