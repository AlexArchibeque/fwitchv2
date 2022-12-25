import React from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const ChannelPage: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const { data: user, isLoading } = trpc.user.getUserAndChannelInfo.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      username,
    },
    { enabled: username !== "" && typeof username === "string" }
  );

  if (isLoading) {
    return <div> Loading ... </div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="pt-4 text-3xl">ChannelPage</h1>
    </div>
  );
};

export default ChannelPage;
