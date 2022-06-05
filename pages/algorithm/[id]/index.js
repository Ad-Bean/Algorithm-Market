import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getItem } from "@api/api";
import SnackBar from "@components/SnackBar";
import Image from "next/image";
import ItemInput from "@components/ItemInput";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [algo, setAlgo] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const getItems = async () => {
      try {
        const ret = await getItem(id);
        setAlgo(ret);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getItems();
    return () => {
      setMessage("");
    };
  }, [id]);

  const closeSnackBar = () => {
    if (message) {
      setMessage("");
    }
  };

  return (
    <div onClick={closeSnackBar} className="max-w-2xl px-6 py-10 mx-auto space-y-12">
      {message ? <SnackBar message={message} /> : null}
      <article className="space-y-8 dark:text-black">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{algo?.name}</h1>
          <div className="flex flex-wrap space-x-2 ">
            {algo &&
              algo.tag.map((t, idx) => {
                return (
                  <Link key={idx} href="#">
                    <a
                      rel="noopener noreferrer"
                      className="text-sm px-3 py-1 rounded-sm hover:underline dark:bg-violet-400 dark:text-gray-200"
                    >
                      #{t}
                    </a>
                  </Link>
                );
              })}
          </div>
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-700">
            <div className="flex items-center md:space-x-2">
              <Image
                src="https://avatars.githubusercontent.com/u/32431960?v=4"
                crossorigin=""
                alt="portrait"
                width={16}
                height={16}
                className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
              <p className="text-sm"> Lanly • July 5th, 2022</p>
            </div>
            <p className="flex-shrink-0 mt-3 text-sm md:mt-0">4 min read • 1,570 views</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xl my-2">算法：{algo?.name}</p>
          <p className="text-xl my-2">简介：{algo?.brief}</p>
          <p className="text-xl my-2">时间复杂度：{algo?.algorithm}</p>
          <p className="text-xl my-2">算法介绍：{algo?.introduce}</p>
        </div>
        <ItemInput id={id} />
      </article>
      <footer>
        <div className="space-y-2 py-4 space-x-2 border-t border-dashed dark:border-gray-400">
          <h4 className="text-lg font-semibold">相关算法</h4>
          <ul className="ml-4 space-y-1 list-disc">
            <li>
              <a rel="noopener noreferrer" href="#" className="hover:underline">
                Others
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Post;
