import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getItem } from "@api/api";
import SnackBar from "@components/SuccessSnackBar";
import MDEditor from "@components/MDEditor";
import Image from "next/image";
import ItemInput from "@components/ItemInput";
import MDPreview from "@components/MDPreview";
import { UserInfo } from "@interfaces/UserInfo";
import { ItemInformation } from "@interfaces/Items";

type Props = {
  info: UserInfo;
};

const Post = ({ info: userInfo }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [itemInfo, setItemInfo] = useState<ItemInformation | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const getItems = async () => {
      try {
        const ret = await getItem(parseInt(id[0]));
        setItemInfo(ret);
      } catch (err) {
        setMessage((err as Error).message);
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
      <div onClick={closeSnackBar} className="max-w-2xl px-6 py-10 mx-auto space-y-12">
        <article className="space-y-8 dark:text-black">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{itemInfo?.name}</h1>
            <div className="flex flex-wrap space-x-2 ">
              {itemInfo &&
                itemInfo.tag.map((t, idx) => {
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
                  crossOrigin=""
                  alt="portrait"
                  width={16}
                  height={16}
                  className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                />
                <p className="text-sm"> Lanly • July 5th, 2022</p>
              </div>
              <p className="flex-shrink-0 mt-3 text-sm md:mt-0"> 4 min read • 1,570 views </p>
            </div>
          </div>
          <div className="mb-4">
            <TextCardLoading title="名称：" content={itemInfo?.name} />
            <TextCardLoading title="简介：" content={itemInfo?.brief} />
            <TextCardLoading title="介绍：" content={undefined} />

            {userInfo?.role === "admin" ? (
              <MDPreview value={itemInfo?.introduce} mde={itemInfo?.name} />
            ) : (
              <MDEditor value={itemInfo?.introduce} mde={itemInfo?.name} />
            )}

            <p className="text-xl my-2">算法：</p>

            {userInfo?.role === "admin" ? (
              <MDPreview value={itemInfo?.introduce} mde={itemInfo?.name + "1"} />
            ) : (
              <MDEditor value={itemInfo?.algorithm} mde={itemInfo?.name + "1"} />
            )}
          </div>
          <ItemInput input={itemInfo?.input} />
        </article>
        <footer>
          <div className="space-y-2 py-4 space-x-2 border-t border-dashed dark:border-gray-400">
            <h4 className="text-lg font-semibold"> 相关算法 </h4>
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
    </>
  );
};

export default Post;

type TextCard = {
  title: string;
  content: string | undefined;
};

const TextCardLoading = ({ title, content }: TextCard) => {
  return title ? (
    <p className="text-xl my-2">
      {title} {content}
    </p>
  ) : (
    <div className="animate-pulse flex space-x-4 my-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};
