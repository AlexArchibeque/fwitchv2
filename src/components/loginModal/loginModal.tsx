import React from "react";
import ReactDom from "react-dom";
import type { Dispatch, SetStateAction } from "react";
import { signIn } from "next-auth/react";
import type { ModalProps } from "../header";
import { trpc } from "../../utils/trpc";

interface LoginErrors {
  username?: string;
  password?: string;
}

const LOGIN_ERRORS: { [key: string]: LoginErrors } = Object.freeze({
  user_missing: {
    username: "Username is not found",
  },
  password_incorrect: {
    password: "Password is incorrect",
  },
  password_missing: {
    password: "Please insert a password",
  },
});

export const LoginModal = ({
  page,
  setOpen,
}: {
  page: string;
  setOpen: Dispatch<SetStateAction<ModalProps>>;
}) => {
  const [currPage, setCurrPage] = React.useState<string>(page);

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loginErrors, setLoginErrors] = React.useState<LoginErrors | null>(
    null
  );

  const [signupUsername, setSignupUsername] = React.useState<string>("");
  const [signupPassword, setSignupPassword] = React.useState<string>("");
  const [signupEmail, setSignupEmail] = React.useState<string>("");
  const [registrationErrors, setRegistrationErrors] = React.useState("");

  const register = trpc.register.registerAccount.useMutation({
    onSuccess: async () => {
      await signIn("cred-login", {
        username: signupUsername,
        password: signupPassword,
      });
    },

    onError: (error) => {
      setRegistrationErrors(error.message);
    },
  });

  const handleSignOn = async () => {
    await signIn("cred-login", {
      redirect: false,
      username,
      password,
    }).then((info) => {
      if (info?.ok) {
        setOpen({ starterPage: "login", isOpen: false });
      } else {
        if (info && typeof info.error === "string") {
          const errors = LOGIN_ERRORS[info.error];
          setLoginErrors(errors || null);
        }
      }
    });
    return;
  };

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

  const errorBorder = "border-red-800 bg-red-900";

  const Content = () => {
    return currPage === "login" ? (
      <div className="flex min-h-max flex-col justify-between py-2">
        <div className="flex w-full flex-col">
          <p className="py-1">UserName</p>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            className={`rounded-md bg-stone-600 p-2 ${
              loginErrors?.username ? errorBorder : ""
            }`}
            placeholder="username"
          />
          {/* Username Errors */}
          <div className="min-h-[40px] py-1 text-red-400">
            {loginErrors?.username}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <p className="pb-2">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
            className={`rounded-md bg-stone-600 p-2 ${
              loginErrors?.password ? errorBorder : ""
            }`}
            placeholder="password"
          />
          {/* Password Errors */}
          <div className="min-h-[40px] py-1 text-red-400">
            {loginErrors?.password}
          </div>
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
          onClick={async () => await handleSignOn()}
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
              className="rounded-md bg-stone-600 p-2"
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
              className="rounded-md bg-stone-600 p-2"
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
              className="rounded-md bg-stone-600 p-2"
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
      <div className="absolute top-0 left-0 z-[250] flex h-full w-full items-center justify-center bg-slate-400/40">
        <div className=" flex items-start gap-2">
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
