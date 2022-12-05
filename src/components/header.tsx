import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { type Session } from "next-auth";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <ul className="flex flex-row content-center items-center justify-between gap-2 border-b border-black bg-stone-900 p-4">
      {/* Section 1 (Top left section)*/}
      <div className="flex gap-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>{session && <Link href="/following">Following</Link>}</li>
        <li>
          <Link href="/browse">Browse</Link>
        </li>
      </div>

      {/* Section 2 (Search bar) */}
      <div className="flex rounded-md">
        <input placeholder="Search" className="rounded-l-md bg-stone-600 p-2" />
        <button className="rounded-r-md bg-stone-700 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {/* Section 3 (User info) */}
      <div className="flex justify-between gap-2">
        {status !== "loading" && <LoginSection loginSess={session} />}
      </div>
    </ul>
  );
};

interface LoginProps {
  loginSess: Session | null;
}

const LoginSection = ({ loginSess }: LoginProps) => {
  return loginSess ? (
    <>
      <li>
        <Link href="/guestbook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </Link>
      </li>
      <li>
        <button onClick={() => signOut()}>Logout</button>
      </li>
      <li>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <button onClick={() => signIn("discord")}>Login</button>
      </li>
      <li>
        <button>Sign Up</button>
      </li>
    </>
  );
};
