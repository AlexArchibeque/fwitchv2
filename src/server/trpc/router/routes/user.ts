import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../../trpc";

export const userRouter = router({
  getUserAndChannelInfo: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.username === "") {
        return {};
      }
      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            userName: input.username,
          },
        });
        if (user && user.channelId) {
          try {
            const channel = await ctx.prisma.channel.findUnique({
              where: {
                id: user.channelId,
              },
            });

            if (channel && channel.categoryId) {
              try {
                const category = await ctx.prisma.category.findUnique({
                  where: {
                    id: channel.categoryId,
                  },
                });
                return {
                  username: user.name,
                  image: user.image,
                  channel,
                  category,
                };
              } catch (error) {
                console.log("error", error);
              }
            }
          } catch (error) {
            console.log("error", error);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    }),
});
