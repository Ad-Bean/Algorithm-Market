import { getList } from "@api/api";
import { Content } from "@components/Content";
import { UserInfo } from "@interfaces/UserInfo";
import { InferGetStaticPropsType } from "next/types";

type User = {
  userEmail: string | null;
  info: UserInfo;
};

type Props = User & InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ info, userEmail, posts }: Props) {
  return <Content posts={posts} role={info?.role} userEmail={userEmail} />;
}

export async function getStaticProps() {
  const posts = await getList();
  return {
    props: { posts },
  };
}
