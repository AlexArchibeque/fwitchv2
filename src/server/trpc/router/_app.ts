import { router } from "../trpc";
import { guestBookRouter } from "./routes/guestbook";
import { registrationRouter } from "./routes/register";
import { userRouter } from "./routes/user";

export const appRouter = router({
  guestbook: guestBookRouter,
  register: registrationRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
