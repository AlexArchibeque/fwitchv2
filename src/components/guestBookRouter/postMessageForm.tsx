import React from "react";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";

export const PostMessageForm = () => {
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState<string>("");
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
  const errorBorder = postMessage.error ? "border-red-800" : "border-zinc-800";

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
        className={`rounded-md border-2 bg-neutral-900 py-2 px-4 focus:outline-none ${errorBorder}`}
      />
      <button
        type="submit"
        className="mb-2 rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Submit
      </button>
      {postMessage.error && (
        <div className="text-md mb-2 rounded-md bg-gray-800 px-2 py-2 text-red-400">
          {error}
        </div>
      )}
    </form>
  );
};
