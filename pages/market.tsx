import React, { useEffect, useState } from 'react';
import { deleteItem, getList, getUserInfo } from '@api/api';
import router from 'next/router';
import { ItemInfo } from '@interfaces/Items';
import { toast, ToastContainer } from 'react-toastify';
import { UserInfo } from '@interfaces/UserInfo';
import Confirm from '@components/Confirm';

type CardInfo = {
  info: UserInfo;
  title: string;
  content: string;
  id: number;
  setCurId: Function;
  setConfirmOpen: Function;
};

const BriefCard = ({ info, title, content, id, setCurId, setConfirmOpen }: CardInfo) => {
  const readMore = () => {
    router.push(`/algorithm/${id}`);
  };

  return (
    <div
      onClick={readMore}
      className="relative flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl hover:scale-105 cursor-pointer"
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
      {info.role === 'admin' && (
        <button
          className="absolute right-2 top-2 -mr-1 ml-1.5 inline-block rounded-full bg-indigo-200 p-0.5 text-indigo-600 transition hover:text-indigo-700 pointer-events-auto"
          onClick={(e) => {
            setCurId(id);
            e.stopPropagation();
            setConfirmOpen(true);
          }}
        >
          <span className="sr-only">Remove badge</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
    </div>
  );
};

type PageProps = {
  info: UserInfo;
  setInfo: Function;
};

export const Market = ({ info, setInfo }: PageProps) => {
  const [posts, setPosts] = useState<ItemInfo[] | null>();

  useEffect(() => {
    const getData = async () => {
      const res = await getList();
      return res;
    };

    getData()
      .then((res) => setPosts(res))
      .catch((_) => toast.error('获取数据失败'));
  }, []);

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [curId, setCurId] = useState<number>(-1);

  const handleDeleteItem = () => {
    if (curId === -1) {
      toast.error('删除失败');
      return;
    }

    deleteItem(curId)
      .then((res) => {
        toast.success('删除成功');
        getList()
          .then((res) => setPosts(res))
          .catch((_) => toast.error('获取数据失败'));
      })
      .catch((err) => {
        console.error(err);
        toast.error('删除失败');
      })
      .finally(() => setCurId(-1));
  };

  useEffect(() => {
    if (!info?.role) {
      router.push('/');
    }
  }, [info]);

  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <div>
        <Confirm
          title="删除"
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDeleteItem}
        >
          你确定要删除该记录吗？
        </Confirm>
      </div>
      <div className="w-full">
        <div className="relative px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 pt-10">
          {info?.role === 'admin' && (
            <a
              className="relative font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100"
              href="/additem"
            >
              添加商品
            </a>
          )}
        </div>
        <div className="relative px-4 pb-16 pt-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pb-20">
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {posts &&
              posts.map((post, _idx) => (
                <BriefCard
                  info={info}
                  setCurId={setCurId}
                  setConfirmOpen={setConfirmOpen}
                  key={post.id}
                  title={post.name}
                  content={post.brief}
                  id={post.id}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;
