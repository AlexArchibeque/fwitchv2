import React from "react";
import { IndividualSection } from "./individualSection";

type ArrayInfo = {
  cssStyles: string;
  reversed: boolean;
};

const backLeft = "z-0 left-20 h-[210px]";
const midLeft = "z-10 left-48 h-[255px]";
const middle = "z-20";
const midRight = "z-10 right-48 h-[255px]";
const backRight = "z-0 right-20 h-[210px]";

const defaultStylesInfo: ArrayInfo[] = [
  { cssStyles: backLeft, reversed: false },
  { cssStyles: midLeft, reversed: false },
  { cssStyles: middle, reversed: false },
  { cssStyles: midRight, reversed: true },
  { cssStyles: backRight, reversed: true },
];

type VideoInfo = {
  name: string;
  id: number;
};

const exampleInfo: Array<VideoInfo> = [
  { name: "Hello!", id: 0 },
  { name: "nopers", id: 1 },
  { name: "nsl;akdf;o1", id: 2 },
  { name: "There we go", id: 3 },
  { name: "Larry", id: 4 },
];

export const RotatingSection = () => {
  const [arrayOfVids, setArrayOfVids] =
    React.useState<Array<VideoInfo>>(exampleInfo);

  const [update, setUpdate] = React.useState<boolean>(false);

  const handleArrowClick = (direction: string) => {
    // let finalArray: Array<VideoInfo> = [];

    if (direction === "left") {
      for (let i = arrayOfVids.length; i >= 0; i--) {
        const currVid = arrayOfVids[i];
        if (!currVid) continue;
        const currId = currVid.id;
        if (currId === 0) {
          currVid.id = 4;
        } else {
          currVid.id = currId - 1;
        }
      }
    } else {
      for (let i = 0; i < arrayOfVids.length; i++) {
        const currVid = arrayOfVids[i];
        if (!currVid) continue;
        const currId = currVid.id;
        if (currId === 4) {
          currVid.id = 0;
        } else {
          currVid.id = (currId + 1) % 5;
        }
      }
    }

    setUpdate(!update);
  };

  console.log(arrayOfVids);

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
            const id = info.id;
            const stylesInfo = defaultStylesInfo[id];
            if (stylesInfo != undefined && info != null) {
              return (
                <IndividualSection
                  key={`${idx}+${info.name}`}
                  name={info.name}
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
