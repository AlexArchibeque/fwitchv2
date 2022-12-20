import { type NextPage } from "next";
import { RotatingSection } from "../components/mainPageRotatingSection/rotatingSection";
import { CldImage } from "next-cloudinary";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col items-center">
      <RotatingSection />
      <CldImage
        width={144}
        height={192}
        src="categories/Super_Metroid_pfg8lq.jpg"
        alt="Example"
      />
      <div>Live channels we think you`ll like</div>
      <div>Categories we think you`ll like</div>
    </main>
  );
};

export default Home;
