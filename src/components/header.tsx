import Link from "next/link";

export const Header = () => {
  return (
    <ul className="flex">
      {/* Section 1 (Top left section)*/}
      <div>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/following">Following</Link>
        </li>
        <li>
          <Link href="/browse">Browse</Link>
        </li>
      </div>

      {/* Section 2 (Search bar) */}
      <div>
        <input placeholder="Search" />
        <button>Search button</button>
      </div>
      {/* Section 3 (User info) */}
      <div>
        <LoginSection />

        <li>
          <Link href="/guestbook">Guestbook</Link>
        </li>
      </div>
    </ul>
  );
};

const LoginSection = () => {
  return (
    <>
      <li>
        <Link href="/login">Login</Link>
      </li>
      <li>
        <Link href="/signup">Sign Up</Link>
      </li>
    </>
  );
};
