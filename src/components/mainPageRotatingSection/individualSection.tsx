import Link from "next/link";
export const IndividualSection = ({
  classes,
  hiddenInfo,
  name,
}: {
  classes: string;
  hiddenInfo: boolean;
  name: string;
}) => {
  const InfoSection = () => {
    return (
      <div className="flex w-[200px] flex-col gap-2 p-2">
        <div className="flex flex-row">
          <div>Image</div>
          <div className="flex flex-col">
            <Link href="/">{name}</Link>
            <Link href="/">Category example</Link>
            <p>EXAMPLE VIEWER COUNT</p>
          </div>
        </div>
        <div>
          Lorem Ipsum and also the bottom section with a large amount of text
          perhaps?
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${classes} absolute flex h-[300px] min-w-[750px] flex-row  rounded-md bg-indigo-800 drop-shadow-lg`}
    >
      {hiddenInfo ? (
        <>
          <video className="h-100 w-full rounded-md" controls />
        </>
      ) : (
        <>
          <video className="h-100 w-[550px] rounded-l-md" controls />
          {InfoSection()}
        </>
      )}
    </div>
  );
};
