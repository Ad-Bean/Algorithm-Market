import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getItem, getList } from '@api/api';
import SnackBar from '@components/SuccessSnackBar';
import MDEditor from '@components/MDEditor';
import Image from 'next/image';
import ItemInput from '@components/ItemInput';
import MDPreview from '@components/MDPreview';
import { UserInfo } from '@interfaces/UserInfo';
import { ItemInformation } from '@interfaces/Items';
import Playground from '@components/Playground';
import { toast } from 'react-toastify';

// export async function getStaticPaths() {
//   const res = await getList();
//   const paths = res.map((post) => ({
//     params: { id: post.id },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// type ItemProps = {
//   params: {
//     id: number;
//   };
// };

// export async function getStaticProps(props: ItemProps) {
//   const {
//     params: { id },
//   } = props;

//   const post = await getItem(id);

//   return {
//     props: { post },
//     revalidate: 60,
//   };
// }

type Props = {
  info: UserInfo;
  // post: ItemInformation;
};

export default function Post({ info: userInfo }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [itemInfo, setItemInfo] = useState<ItemInformation>();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;

    const getItems = async () => {
      try {
        const ret = await getItem(+id);
        setItemInfo(ret);
      } catch (err) {
        console.error(err);
        toast.error('获取物品失败');
      }
    };

    getItems();
    return () => {
      setMessage('');
    };
  }, [id]);

  const closeSnackBar = () => {
    if (message) {
      setMessage('');
    }
  };

  return (
    <>
      {message ? <SnackBar message={message} /> : null}
      <div onClick={closeSnackBar} className="max-w-2xl px-6 py-10 mx-auto space-y-12">
        <article className="space-y-8 dark:text-black">
          <div className="space-y-6">
            <div className="flex flex-col justify-between">
              <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{itemInfo?.name}</h1>
              {userInfo?.role === 'admin' && (
                <Link href={`/edititem/${id}`}>
                  <a
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-0 leading-[48px] rounded-sm hover:underline text-indigo-700 hover:text-indigo-300"
                  >
                    编辑
                  </a>
                </Link>
              )}
            </div>
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
            {itemInfo?.introduce && <MDEditor value={itemInfo?.introduce} mde={itemInfo?.name!} />}

            <p className="text-xl my-2">算法：</p>
            {itemInfo?.algorithm && (
              <MDEditor value={itemInfo?.algorithm} mde={itemInfo?.name + '1'} />
            )}
          </div>
          {id && <ItemInput input={itemInfo?.input} itemId={parseInt(id as string)} />}
        </article>
        <div className="bg-gray-100 rounded-3xl p-2">
          {id && <Playground itemId={parseInt(id as string)} inputs={itemInfo?.input} />}
        </div>
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
}

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
