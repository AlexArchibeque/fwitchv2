import { trpc } from "../../utils/trpc";

export const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  return isLoading ? (
    <div> Fetching messages... </div>
  ) : (
    <div className="flex gap-2">
      {messages?.map((msg, idx) => {
        return (
          <div
            className="align-center flex flex-col rounded-md border border-black bg-stone-800 p-4"
            key={`msg-${idx}`}
          >
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};
