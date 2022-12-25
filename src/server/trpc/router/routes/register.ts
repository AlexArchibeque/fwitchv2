import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import bcrypt from "bcrypt";

export const registrationRouter = router({
  registerAccount: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userName = input.username;

        if (
          userName === "guestbook" ||
          userName === "browse" ||
          userName === "following"
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `You cannot use ${userName}`,
          });
        }

        const hashedPassword = bcrypt.hashSync(input.password, 10);
        const DEFAULT_CATEGORY_ID = "clc2ek7gt0000356kw2yx42ki";
        const DEFAULT_PROFILE_PIC_LINK = "channelPics/default_dnum1a.webp";
        const user = await ctx.prisma.user.create({
          data: {
            name: userName,
            userName: userName,
            email: input.email,
            password: hashedPassword,
            image: DEFAULT_PROFILE_PIC_LINK,
            channel: {
              create: {
                description:
                  "Welcome to Fwitch! Feel free to change this to your channels description!",
                categoryId: DEFAULT_CATEGORY_ID,
              },
            },
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Something went wrong in the registration process",
          });
        }
      } catch (error) {
        throw error;
      }
    }),
});
