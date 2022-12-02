import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl pt-4">Guestbook</h1>

      <div className="pt-10">
        {session ?
          <>
            <div>Hi {`${session.user?.name}`}</div>
            <button onClick={() => signOut()}>Logout</button>

          </>
          :
          <button onClick={() => signIn('discord')}>Sign in with discord</button>
        }
      </div>
    </main>
  );
};

export default Home;