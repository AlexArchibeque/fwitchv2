import React from "react";
import { IndividualSection } from "./individualSection";

type ArrayInfo = {
  cssStyles: string;
  hiddenInfo: boolean;
};

type VideoInfo = {
  name: string;
  id: number;
};

const exampleInfo: Array<VideoInfo> = [
  { name: "Nope!", id: 0 },
  { name: "Hello!", id: 1 },
  { name: "nopers", id: 2 },
  { name: "nsl;akdf;o1", id: 3 },
  { name: "There we go", id: 4 },
  { name: "Larry", id: 5 },
  { name: "thereWego!", id: 6 },
];

let hiddenLeft =
  " -translate-x-[350px] h-[150px] transition-all ease-in duration-[0.5s] animate-fade opacity-0";
let backLeft = `z-10 -translate-x-[250px] h-[210px]  transition-all ease-in duration-[0.5s] animate-fade opacity-100`;
let midLeft = `z-20 -translate-x-[150px] h-[255px] w-[650px] transition-all ease-in  duration-[0.5s]`;
let middle = "z-30 transition-all h-[300px] ease-in duration-[0.5s]";
let midRight = `z-20 translate-x-[150px] h-[255px] w-[650px] transition-all ease-out duration-[0.5s]`;
let backRight = `z-10 translate-x-[250px] h-[210px] transition-all ease-out duration-[0.5s] animate-fade opacity-100`;
let hiddenRight =
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

export const RotatingSection = () => {
  const [arrayOfVids, setArrayOfVids] =
    React.useState<Array<VideoInfo>>(exampleInfo);

  const [update, setUpdate] = React.useState<boolean>(false);

  const handleArrowClick = (direction: string) => {
    if (direction === "left") {
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
    } else {
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
    }

    setUpdate(!update);
  };

  return (
    <div
      className="mt-[25px] flex min-w-full items-center"
      id="carousel-container"
    >
      <div className="relative flex min-h-[450px] min-w-full items-center justify-between bg-red-700">
        <button
          onClick={() => {
            handleArrowClick("left");
          }}
          className="z-40 h-10 bg-slate-700"
        >
          {`${"<"}`}
        </button>
        <div className="absolute flex min-h-full min-w-full items-center justify-center overflow-x-clip bg-indigo-500">
          {arrayOfVids.map((info, idx) => {
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
          className="z-40 h-10 bg-slate-700"
        >
          {`${">"}`}
        </button>
      </div>
    </div>
  );
};

// 637.5 255
// 535.5 210

// translate-x-0 translate-y-0 translate-z-0

//translate3d(tx, ty, tz)
// .slider-item-front {
//   transform:translate3d(0px,0px,0px);
// }

// .slider-item-left {
//   transform:translate3d(-40%,0px,-100px);
// }

// .slider-item-back-left {
//   transform:translate3d(-70%,0px,-200px);
// }

// .slider-item-right {
//   transform:translate3d(40%, 0px, -100px);
// }

// .slider-item-back-right {
//   transform: translate3d(70%, 0px, -200px);
// }
