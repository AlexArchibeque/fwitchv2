import { trpc } from "../../utils/trpc";

export const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  return isLoading ? (
    <div> Fetching messages... </div>
  ) : (
    <div>
      {messages?.map((msg, idx) => {
        return (
          <div key={`msg-${idx}`}>
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};
