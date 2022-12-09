import React from "react";
import ReactDom from "react-dom";
import { Dispatch, SetStateAction } from "react";
import { signIn } from "next-auth/react";
import { ModalProps } from "../header";
import { trpc } from "../../utils/trpc";

export const LoginModal = ({
  page,
  setOpen,
}: {
  page: string;
  setOpen: Dispatch<SetStateAction<ModalProps>>;
}) => {
  const [currPage, setCurrPage] = React.useState<string>(page);

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loginErrors, setLoginErrors] = React.useState("");

  const [signupUsername, setSignupUsername] = React.useState<string>("");
  const [signupPassword, setSignupPassword] = React.useState<string>("");
  const [signupEmail, setSignupEmail] = React.useState<string>("");
  const [registrationErrors, setRegistrationErrors] = React.useState("");

  const register = trpc.register.registerAccount.useMutation({
    onSuccess: async () => {
      await signIn("email-login", {
        email: signupEmail,
        password: signupPassword,
      });
    },

    onError: (error) => {
      setRegistrationErrors(error.message);
    },
  });

  const Header = () => {
    return currPage === "login" ? (
      <div className="flex h-12 min-w-full items-center justify-center">
        Log in to Twitch
      </div>
    ) : (
      <div className="flex h-12 min-w-full items-center justify-center">
        Join Twitch today
      </div>
    );
  };

  const Content = () => {
    return currPage === "login" ? (
      <div className="flex min-h-max flex-col justify-between gap-2 py-4">
        <div className="flex w-full flex-col">
          <p className="py-1">UserName</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            className="rounded-md bg-neutral-900 p-1"
            placeholder="username"
          />
          <div className="min-h-[40px] py-1"></div>
        </div>
        <div className="flex w-full flex-col">
          <p className="py-1">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
            className="rounded-md bg-neutral-900 p-1"
            placeholder="password"
          />
          <div className="min-h-[40px] py-1"></div>
        </div>

        <div className="flex w-full flex-col pb-1">
          <button
            className="rounded-md bg-indigo-500 py-2 hover:bg-indigo-600"
            onClick={() => signIn("discord")}
          >
            Login with discord
          </button>
        </div>
        <button
          onClick={() =>
            signIn("email-login", { redirect: false, email, password })
          }
          className="rounded-md bg-indigo-500 py-2 hover:bg-indigo-600"
        >
          Log In
        </button>
      </div>
    ) : (
      <>
        <div className="flex min-h-max flex-col justify-between gap-2 py-4">
          <div className="flex w-full flex-col">
            <p className="py-1">UserName</p>
            <input
              onChange={(e) => setSignupUsername(e.target.value)}
              value={signupUsername}
              type="text"
              className="rounded-md bg-neutral-900 p-1"
              placeholder="username"
            />
            <div className="min-h-[40px] py-1"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="py-1">Password</p>
            <input
              onChange={(e) => setSignupPassword(e.target.value)}
              value={signupPassword}
              type="text"
              className="rounded-md bg-neutral-900 p-1"
              placeholder="password"
            />
            <div className="min-h-[40px] py-1"></div>
          </div>
          <div className="flex w-full flex-col">
            <p className="py-1">Email</p>
            <input
              onChange={(e) => setSignupEmail(e.target.value)}
              value={signupEmail}
              type="text"
              className="rounded-md bg-neutral-900 p-1"
              placeholder="email"
            />
            <div className="min-h-[40px] py-1"></div>
          </div>
          <button
            onClick={() =>
              register.mutate({
                username: signupUsername,
                password: signupPassword,
                email: signupEmail,
              })
            }
            className="rounded-md bg-indigo-500 py-2 hover:bg-indigo-600"
          >
            Sign up
          </button>
        </div>
      </>
    );
  };

  const selectedClass =
    "font-bold text-indigo-800 border-b-2 border-indigo-700";

  return ReactDom.createPortal(
    <>
      <div className="absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center bg-slate-400/40">
        <div className="flex items-start gap-2">
          {/* Main Content */}
          <div className="z-10 min-h-[350px] min-w-[400px] rounded-md border border-black bg-stone-900 px-2 py-4">
            {Header()}
            <div className="flex gap-2 border-b border-slate-600">
              <button
                className={`py-2 ${currPage === "login" ? selectedClass : ""}`}
                onClick={() => setCurrPage("login")}
              >
                Log In
              </button>
              <button
                className={`py-2 ${
                  currPage === "register" ? selectedClass : ""
                }`}
                onClick={() => setCurrPage("register")}
              >
                Sign Up
              </button>
            </div>
            {Content()}
          </div>
          <button
            onClick={() => setOpen({ starterPage: "login", isOpen: false })}
            className="rounded-md px-4 py-2 hover:bg-slate-500"
          >
            X
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};
