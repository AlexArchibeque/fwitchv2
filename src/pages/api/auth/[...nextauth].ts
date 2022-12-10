import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user?.id;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "cred-login",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const username = credentials?.username;
        const plainPassword = credentials?.password;
        const user = await prisma.user.findUnique({
          where: {
            userName: username,
          },
        });
        if (!user) {
          throw new Error("user_missing");
        }
        if (user && plainPassword) {
          const savedPassword = user.password || "";
          const isCorrectPassword = bcrypt.compareSync(
            plainPassword,
            savedPassword
          );
          if (isCorrectPassword) return user;
          throw new Error("password_incorrect");
          // Any object returned will be saved in `user` property of the JWT
          // return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("password_missing");
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
