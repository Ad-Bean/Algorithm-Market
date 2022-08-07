import { Content } from "@components/Content";
import { UserInfo } from "@interfaces/UserInfo";

type Props = {
  userEmail: string | null;
  info: UserInfo;
};

export default function Home({ userEmail, info }: Props) {
  return <Content role={info?.role} userEmail={userEmail} />;
}
