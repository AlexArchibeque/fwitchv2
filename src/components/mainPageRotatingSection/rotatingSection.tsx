import React from "react";
import { IndividualSection } from "./individualSection";

export const RotatingSection = () => {
  const [arrayOfVids, setArrayOfVids] = React.useState([1, 2, 3, 4, 5]);

  return (
    <>
      <div className="flex min-w-full items-center">
        <div className="flex min-w-full justify-between">
          <button className="bg-slate-700">LEFT ARROW</button>
          <button className="bg-slate-700">RIGHT ARROW</button>
        </div>
        <div className="top-0 left-0 flex min-h-[300px] min-w-[400px] bg-red-700">
          <IndividualSection classes="relative z-0 left-4" />
          <IndividualSection classes="z-10 relative left-20" />
          <IndividualSection classes="z-20 relative left-52" />
          <IndividualSection classes="z-10 relative left-20" />
          <IndividualSection classes="z-0 relative left-4" />
        </div>
      </div>
    </>
  );
};
