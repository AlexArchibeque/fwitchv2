import Link from "next/link";
export const IndividualSection = ({
  classes,
  reversed,
  name,
}: {
  classes: string;
  reversed: boolean;
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
      className={`${classes} absolute flex h-[300px] w-4 min-w-[750px] flex-row rounded-md bg-indigo-800 transition-all duration-500 ease-in-out`}
    >
      {reversed ? (
        <>
          {InfoSection()}
          <video className="h-100 w-[550px] rounded-r-md" controls />
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
