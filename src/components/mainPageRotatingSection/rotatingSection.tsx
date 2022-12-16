import React from "react";
import { IndividualSection } from "./individualSection";

type ArrayInfo = {
  cssStyles: string;
  reversed: boolean;
};

const backLeft: string = "z-0 left-20 h-[210px] ";
const midLeft: string = "z-10 left-48 h-[255px]";
const middle: string = "z-20";
const midRight: string = "z-10 right-48 h-[255px]";
const backRight: string = "z-0 right-20 h-[210px]";

const defaultStylesInfo: ArrayInfo[] = [
  { cssStyles: backLeft, reversed: false },
  { cssStyles: midLeft, reversed: false },
  { cssStyles: middle, reversed: false },
  { cssStyles: midRight, reversed: true },
  { cssStyles: backRight, reversed: true },
];

type VideoInfo = {
  name: string;
};

const exampleInfo: Array<VideoInfo> = [
  { name: "Hello!" },
  { name: "nopers" },
  { name: "nsl;akdf;o1" },
  { name: "There we go" },
  { name: "Larry" },
];

export const RotatingSection = () => {
  const [arrayOfVids, setArrayOfVids] =
    React.useState<Array<VideoInfo>>(exampleInfo);

  const handleArrowClick = (direction: string) => {
    let finalArray: Array<VideoInfo> = [];

    if (direction === "left") {
      for (let i = arrayOfVids.length; i >= 0; i--) {
        const currVid = arrayOfVids[i];
        if (!currVid) continue;
        if (i === 0) {
          finalArray[4] = currVid;
        } else {
          finalArray[i - 1] = currVid;
        }
      }
    } else {
      for (let i = 0; i < arrayOfVids.length; i++) {
        const currVid = arrayOfVids[i];
        if (!currVid) continue;
        if (i === 4) {
          finalArray[0] = currVid;
        } else {
          finalArray[i + 1] = currVid;
        }
      }
    }

    setArrayOfVids(finalArray);
  };

  return (
    <div className="mt-[25px] flex min-w-full items-center ">
      <div className="relative flex min-h-[450px] min-w-full items-center justify-between bg-red-700">
        <button
          onClick={() => {
            handleArrowClick("left");
          }}
          className="z-40 h-10 bg-slate-700"
        >
          LEFT ARROW
        </button>
        <div className="absolute flex min-h-full min-w-full items-center justify-center bg-indigo-500">
          {arrayOfVids.map((info, idx) => {
            const stylesInfo = defaultStylesInfo[idx];
            const currentVideo = arrayOfVids[idx];
            if (stylesInfo != undefined && currentVideo != null) {
              return (
                <IndividualSection
                  key={`${idx}+${currentVideo.name}`}
                  name={currentVideo.name}
                  reversed={stylesInfo.reversed}
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
          RIGHT ARROW
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
