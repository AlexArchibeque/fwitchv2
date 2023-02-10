import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { Messages } from "../../components/guestBookRouter/messages";
import { PostMessageForm } from "../../components/guestBookRouter/postMessageForm";

const GuestBook: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <main className="flex flex-col items-center">
        <h1 className="pt-4 text-3xl">Guestbook</h1>
        <div className="pt-10">{session && <PostMessageForm />}</div>
        <div>
          <Messages />
        </div>
      </main>
    </>
  );
};

export default GuestBook;
