import Link from "next/link";
export const IndividualSection = ({ classes }: { classes: string }) => {
  const TopSection = () => {
    return (
      <div className="flex flex-row">
        <div>Image</div>
        <div className="flex flex-col">
          <Link href="/">Name example</Link>
          <Link href="/">Category example</Link>
          <p>EXAMPLE VIEWER COUNT</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`${classes} flex w-14 flex-row`}>
        <video controls />
        <div className="flex flex-col gap-2">
          <TopSection />
          <div>
            Lorem Ipsum and also the bottom section with a large amount of text
            perhaps?
          </div>
        </div>
      </div>
    </>
  );
};
