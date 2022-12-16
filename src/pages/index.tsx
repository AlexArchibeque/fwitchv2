import { type NextPage } from "next";
import { RotatingSection } from "../components/mainPageRotatingSection/rotatingSection";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col items-center">
      <RotatingSection />
      <div>Live channels we think you`ll like</div>
      <div>Categories we think you`ll like</div>
    </main>
  );
};

export default Home;
