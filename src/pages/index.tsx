import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>
  }
  console.log('session', session)
  return (
    <main>
      <div> Hello! </div>
      {session ?
        <>
          <div>Hi {`${session.user?.name}`}</div>
          <button onClick={() => signOut()}>Logout</button>

        </>
        :
        <button onClick={() => signIn('discord')}>Sign in with discord</button>
      }
    </main>
  );
};

export default Home;