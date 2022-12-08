import { type NextPage } from "next";
import { RotatingSection } from "../components/mainPageRotatingSection/rotatingSection";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  // const { data: session, status } = useSession();
  {
    /* {status === "loading" ? "Loading ..." : "In the main page"} */
  }

  return (
    <main className="flex flex-col items-center">
      In the main page
      <RotatingSection />
      <div>Live channels we think you'll like</div>
      <div>Categories we think you'll like</div>
    </main>
  );
};

export default Home;
