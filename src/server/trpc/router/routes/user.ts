import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../../trpc";

export const userRouter = router({
  getUsers: publicProcedure
    .input(
      z.object({
        amount: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const users = await ctx.prisma.user.findMany({
          where: {
            channelId: {
              not: null,
            },
          },
          select: {
            userName: true,
            name: true,
            image: true,
            channel: {
              select: {
                description: true,
                category: {
                  select: { image: true, title: true },
                },
              },
            },
          },
          take: input.amount,
        });

        return users || {};
      } catch (error) {
        console.log("error", error);
      }
    }),

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
