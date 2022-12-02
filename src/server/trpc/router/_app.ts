import { router } from "../trpc";
import { authRouter } from "./auth";
import { guestBookRouter } from './guestbook'

export const appRouter = router({
  guestbook: guestBookRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
