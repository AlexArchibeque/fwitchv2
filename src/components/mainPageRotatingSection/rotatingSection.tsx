import React from "react";
import { IndividualSection } from "./individualSection";
import { type User } from "@prisma/client";

type ArrayInfo = {
  cssStyles: string;
  hiddenInfo: boolean;
};

type VideoInfo = {
  name: string;
  id: number;
  description: string;
  image: string;
};

const hiddenLeft =
  " -translate-x-[350px] h-[150px] transition-all ease-in duration-[0.5s] animate-fade opacity-0";
const backLeft = `z-10 -translate-x-[250px] h-[210px]  transition-all ease-in duration-[0.5s] animate-fade opacity-100`;
const midLeft = `z-20 -translate-x-[150px] h-[255px] w-[650px] transition-all ease-in duration-[0.5s]`;
const middle = "z-30 transition-all h-[300px] ease-in duration-[0.5s]";
const midRight = `z-20 translate-x-[150px] h-[255px] w-[650px] transition-all ease-out duration-[0.5s]`;
const backRight = `z-10 translate-x-[250px] h-[210px] transition-all ease-out duration-[0.5s] animate-fade opacity-100`;
const hiddenRight =
  " translate-x-[350px] h-[150px] transition-all ease-in duration-[0.5s] animate-fade opacity-0";

const defaultStylesInfo: ArrayInfo[] = [
  { cssStyles: hiddenLeft, hiddenInfo: true },
  { cssStyles: backLeft, hiddenInfo: true },
  { cssStyles: midLeft, hiddenInfo: true },
  { cssStyles: middle, hiddenInfo: false },
  { cssStyles: midRight, hiddenInfo: true },
  { cssStyles: backRight, hiddenInfo: true },
  { cssStyles: hiddenRight, hiddenInfo: true },
];

type InnerUser = {
  image: string | null;
  name: string | null;
  userName: string | null;
  channel: {
    description: string;
    category: {
      image: string;
      title: string;
    };
  } | null;
};

const formatInfo = (
  arrayOfUsers: InnerUser[] | undefined
): Array<VideoInfo> => {
  const array = [];
  if (arrayOfUsers) {
    for (let i = 0; i < arrayOfUsers.length; i++) {
      const currentUser = arrayOfUsers[i];
      console.log("currentUserInfo:", currentUser);
      array.push({
        image: currentUser?.image || "",
        name: currentUser?.name || "",
        description: currentUser?.channel?.description || "",
        id: i,
      });
    }
  }
  return array;
};

export const RotatingSection = ({
  isLoading,
  users,
}: {
  isLoading: boolean;
  users: InnerUser[] | undefined;
}) => {
  const [arrayOfVids, setArrayOfVids] = React.useState([])<Array<VideoInfo>>;
  const [leftClickable, setLeftClickable] = React.useState(true);
  const [rightClickable, setRightClickable] = React.useState(true);
  const MAX_CLICK_SPEED = 400;

  React.useEffect(() => {
    if (!isLoading) {
      setArrayOfVids(formatInfo(users));
    }
  }, [isLoading]);

  const handleArrowClick = (direction: string) => {
    if (direction === "left" && leftClickable) {
      for (let i = arrayOfVids.length; i >= -1; i--) {
        const currVid = arrayOfVids[i];
        if (!currVid) continue;
        const currId = currVid.id;
        if (currId === 0) {
          currVid.id = 6;
        } else {
          currVid.id = currId - 1;
        }
      }
      setLeftClickable(false);
      setTimeout(() => setLeftClickable(true), MAX_CLICK_SPEED);
    } else if (direction === "right" && rightClickable) {
      for (let i = 0; i < arrayOfVids.length; i++) {
        const currVid = arrayOfVids[i];
        if (!currVid) continue;
        const currId = currVid.id;
        if (currId === 6) {
          currVid.id = 0;
        } else {
          currVid.id = (currId + 1) % 7;
        }
      }
      setRightClickable(false);
      setTimeout(() => setRightClickable(true), MAX_CLICK_SPEED);
    }
  };

  return (
    <div
      className="mt-[25px] flex min-w-full items-center"
      id="carousel-container"
    >
      <div className="relative flex min-h-[450px] min-w-full items-center justify-between">
        <button
          onClick={() => {
            handleArrowClick("left");
          }}
          className="z-40 m-10 flex h-10 w-10 items-center justify-center rounded-md text-lg font-bold hover:bg-slate-500"
        >
          {`${"<"}`}
        </button>
        <div className="absolute flex min-h-full min-w-full items-center justify-center overflow-x-clip">
          {arrayOfVids.length > 0 &&
            arrayOfVids.map((info, idx) => {
              const id = info.id;
              const stylesInfo = defaultStylesInfo[id];
              if (stylesInfo != undefined && info != null) {
                return (
                  <IndividualSection
                    key={`${idx}+${info.name}`}
                    name={info.name}
                    hiddenInfo={stylesInfo.hiddenInfo}
                    classes={stylesInfo.cssStyles}
                  />
                );
              }
              return null;
            })}
        </div>
        <button
          onClick={() => {
            handleArrowClick("right");
          }}
          className="z-40 m-10 flex h-10 w-10 items-center justify-center rounded-md text-lg font-bold hover:bg-slate-500"
        >
          {`${">"}`}
        </button>
      </div>
    </div>
  );
};
