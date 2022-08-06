import { Content } from "@components/Content";

type Props = {
  userId: number | null;
};

export default function Home({ userId }: Props) {
  return <Content userId={userId} />;
}
