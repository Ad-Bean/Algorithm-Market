import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function Card(props) {
  const { id, brief, name, picture, tag } = props;
  const router = useRouter();

  const readMore = () => {
    router.push(`/algorithm/${id}`);
  };

  return (
    <div
      className="duration-300 transform bg-white  hover:-translate-y-2
    max-w-xs rounded-md shadow-md dark:bg-white dark:text-black"
    >
      <Image
        src="https://source.unsplash.com/random/300x300/?2"
        alt="picture"
        width={100}
        height={100}
        className="object-cover object-center mx-auto w-full rounded-t-md h-72 dark:bg-gray-500"
      />

      <div className="shadow-sm flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{name}</h2>
          <p className="dark:text-black">{brief}</p>
          <p className=" text-sm dark:text-gray-700">
            标签：
            {tag && tag.map((t, idx) => <span key={idx}>{t} </span>)}
          </p>
        </div>
        <button
          type="button"
          onClick={readMore}
          className="flex items-center justify-center w-full p-2 font-semibold tracking-wide rounded-md dark:bg-violet-400 dark:text-gray-100"
        >
          阅读
        </button>
      </div>
    </div>
  );
}

export default Card;
