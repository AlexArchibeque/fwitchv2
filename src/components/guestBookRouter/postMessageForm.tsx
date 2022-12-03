import React from "react";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";

export const PostMessageForm = () => {
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const utils = trpc.useContext();
  const postMessage = trpc.guestbook.postMessage.useMutation({
    onMutate: async () => {
      if (!postMessage.error) {
        await utils.guestbook.getAll.cancel();
        const optimisticUpdate = utils.guestbook.getAll.getData();
        if (optimisticUpdate) {
          utils.guestbook.getAll.setData(undefined, optimisticUpdate);
        }
      }
    },
    onSettled: () => {
      utils.guestbook.getAll.invalidate();
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const { data: session } = useSession();

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: session?.user?.name as string,
          message,
        });
        setMessage("");
      }}
    >
      <input
        type="text"
        value={message}
        minLength={2}
        maxLength={100}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message..."
        className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Submit
      </button>
      {postMessage.error && (
        <div className="text-md rounded-md bg-gray-800 px-2 py-2 text-red-200">
          {postMessage.error.message}
        </div>
      )}
    </form>
  );
};
