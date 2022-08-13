import { getList } from "@api/api";
import { Content } from "@components/Content";
import { ItemInfo } from "@interfaces/Items";
import { UserInfo } from "@interfaces/UserInfo";
import { InferGetStaticPropsType } from "next/types";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type User = {
  userEmail: string | null;
  info: UserInfo;
};

export default function Home({ info, userEmail }: User) {
  const [posts, setPosts] = useState<ItemInfo[] | null>();

  useEffect(() => {
    const getData = async () => {
      const res = await getList();
      return res;
    };

    getData()
      .then((res) => setPosts(res))
      .catch((_) => toast.error("获取数据失败"));
  }, []);

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
      {posts && <Content posts={posts} role={info?.role} userEmail={userEmail} />}
    </>
  );
}
