import { useState } from "react";
import Card from "./Card";
import Badget from "./icons/Badget";
import ErrorSnackBar from "./ErrorSnackBar";
import Link from "next/link";
import { ItemInfo } from "@interfaces/Items";

type Props = {
  posts: ItemInfo[];
  role: string;
  userEmail: string | null;
};

export const Content = ({ posts, role, userEmail }: Props) => {
  const [message, setMessage] = useState("");

  const closeSnackBar = () => {
    if (message) {
      setMessage("");
    }
  };

  return (
    <>
      {message ? <ErrorSnackBar message={message} /> : null}
      <div
        onClick={closeSnackBar}
        className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10"
      >
        <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Algorithm Market
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <Badget />
              <span className="relative text-2xl"> 大学生创新创业训练计划项目 </span>
            </span>
            <br />
            算法超市
          </h2>
          <p className="text-base text-gray-700 md:text-lg">中山大学 大学生创新创业训练计划项目</p>
        </div>

        <div className="mx-auto grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-4 sm:grid-cols-2">
          {posts &&
            posts.slice(0, 4).map((item, idx) => {
              return (
                <Card
                  role={role}
                  key={item.id}
                  id={item.id}
                  tag={item.tag}
                  name={item.name}
                  brief={item.brief}
                  picture={item.picture}
                />
              );
            })}
        </div>

        <div className="text-center mt-12">
          <Link href="/market">
            <a className="transform hover:-translate-y-0.5 inline-flex items-center justify-center w-full h-10 px-8 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-deep-purple-accent-200 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
              查看更多
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
