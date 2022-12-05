import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <main className="flex flex-col items-center">
      {status === "loading" ? "Loading ..." : "In the main page"}
    </main>
  );
};

export default Home;
