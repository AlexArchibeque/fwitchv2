import { router } from "../trpc";
import { guestBookRouter } from "./routes/guestbook";

export const appRouter = router({
  guestbook: guestBookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
