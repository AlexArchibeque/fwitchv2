import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Sidebar } from "../components/sidebar";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <div className="flex justify-start">
        <Sidebar />
        <div className="flex flex-col">
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
