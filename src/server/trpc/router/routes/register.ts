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
        const hashedPassword = bcrypt.hashSync(input.password, 10);
        const user = await ctx.prisma.user.create({
          data: {
            name: input.username,
            userName: input.username,
            email: input.email,
            password: hashedPassword,
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
