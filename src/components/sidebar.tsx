import { type NextPage } from "next";
import React from "react";

export const Sidebar: NextPage = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const width = isOpen ? "w-60" : "w-12";

  const setSidebarStatus = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border-r border-black ${width} flex min-h-screen flex-col bg-stone-800 p-2`}
    >
      <div className="flex flex-row items-center justify-between">
        {isOpen && <p>For You</p>}
        <button onClick={() => setSidebarStatus()}>
          {" "}
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          )}
        </button>
      </div>
      {isOpen && <ul>Followed Channels</ul>}
      {isOpen && <ul>Recommended Channels</ul>}
    </div>
  );
};
