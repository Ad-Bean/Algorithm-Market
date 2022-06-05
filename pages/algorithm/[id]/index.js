import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getItem } from "@api/api";
import SnackBar from "@components/SnackBar";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [algo, setAlgo] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
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
    <>
      {message ? <SnackBar message={message} /> : null}
      <article
        onClick={closeSnackBar}
        className="max-w-2xl px-6 py-24 mx-auto space-y-16  dark:text-black"
      >
        <div className="w-full mx-auto space-y-4">
          <h1 className="text-5xl font-bold leading-none">{algo ? algo.name : ""}</h1>
          <div className="flex flex-wrap space-x-2 text-sm dark:text-gray-700">
            {algo?.tag.map((t, idx) => (
              <a key={idx} rel="noopener noreferrer" href="#" className="p-1 hover:underline">
                #{t}
              </a>
            ))}
          </div>
          <p className="text-sm dark:text-black">
            by
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <a className="hover:underline dark:text-violet-400">
                <span> Leroy Jenkins </span>
              </a>
            </Link>
            on
            <time dateTime="2021-02-12 15:34:18-0200">Feb 12th 2021</time>
          </p>
        </div>
        <div className="dark:text-black">
          <p>{algo?.algorithm}</p>
          <p>{algo?.brief}</p>
          <p>{algo?.introduce}</p>
        </div>
      </article>
    </>
  );
};

export default Post;
