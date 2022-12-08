import { router } from "../trpc";
import { guestBookRouter } from "./routes/guestbook";
import { registrationRouter } from "./routes/register";

export const appRouter = router({
  guestbook: guestBookRouter,
  register: registrationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
