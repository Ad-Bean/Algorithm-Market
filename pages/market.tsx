import Image from "next/image";
import React from "react";
import { getList } from "@api/api";
import { InferGetStaticPropsType } from "next/types";
import router from "next/router";

type CardInfo = {
  title: string;
  content: string;
  id: number;
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export async function getStaticProps() {
  const posts = await getList();
  return {
    props: { posts },
  };
}

const BriefCard = ({ title, content, id }: CardInfo) => {
  const readMore = () => {
    router.push(`/algorithm/${id}`);
  };
  return (
    <div
      onClick={readMore}
      className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl hover:scale-105 cursor-pointer"
    >
      <div className="p-5">
        <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
          <svg
            className="w-8 h-8 text-deep-purple-accent-400"
            stroke="currentColor"
            viewBox="0 0 52 52"
          >
            <polygon
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              points="29 13 14 29 25 29 23 39 38 23 27 23"
            />
          </svg>
        </div>
        <p className="mb-2 font-bold"> {title} </p>
        <p className="text-sm leading-5 text-gray-900"> {content} </p>
      </div>
      <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
    </div>
  );
};

export const Market = ({ posts }: Props) => {
  return (
    <div className="w-full">
      <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, _idx) => (
            <BriefCard key={post.id} title={post.name} content={post.brief} id={post.id} />
          ))}
          {posts.map((post, _idx) => (
            <BriefCard key={post.id} title={post.name} content={post.brief} id={post.id} />
          ))}
          {posts.map((post, _idx) => (
            <BriefCard key={post.id} title={post.name} content={post.brief} id={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
