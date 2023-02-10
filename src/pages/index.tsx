import { type NextPage } from "next";
import { RotatingSection } from "../components/mainPageRotatingSection/rotatingSection";
import { CldImage } from "next-cloudinary";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: user, isLoading } = trpc.user.getUsers.useQuery({ amount: 10 });
  return (
    <main className="flex flex-col items-center">
      <RotatingSection isLoading={isLoading} users={user} />
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
