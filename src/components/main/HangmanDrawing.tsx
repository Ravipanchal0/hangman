type HangmanDrawingProps = {
  noOfGuesses: number;
};

const HEAD = (
  <div className="absolute top-5 sm:top-11 -right-5 size-12 rounded-full border-4 border-slate-900 dark:border-slate-200" />
);
const BODY = (
  <div className="absolute top-16 sm:top-22 right-0.5 w-1 h-14 bg-slate-900 dark:bg-slate-200 rounded-full" />
);
const RIGHT_HAND = (
  <div className="absolute origin-bottom-left top-19 sm:top-25 -right-6.5 w-8 h-1 bg-slate-900 dark:bg-slate-200 rotate-40 rounded-full" />
);
const LEFT_HAND = (
  <div className="absolute origin-bottom-right top-19 sm:top-25 right-0.5 w-8 h-1 bg-slate-900 dark:bg-slate-200 -rotate-40  rounded-full" />
);
const RIGHT_LEG = (
  <div className="absolute origin-bottom-left top-29 sm:top-35  -right-9.5 w-11 h-1 bg-slate-900 dark:bg-slate-200 rotate-55  rounded-full" />
);
const LEFT_LEG = (
  <div className="absolute origin-bottom-right top-29 sm:top-35  right-0.5 w-11 h-1 bg-slate-900 dark:bg-slate-200 -rotate-55 rounded-full" />
);

const HangmanDrawing = ({ noOfGuesses }: HangmanDrawingProps) => {
  const BODY_PARTS = [HEAD, BODY, RIGHT_HAND, LEFT_HAND, RIGHT_LEG, LEFT_LEG];
  return (
    <div className="relative -translate-x-12">
      {BODY_PARTS.slice(0, noOfGuesses)}
      <div className="absolute top-0 right-0 h-6 sm:h-12 w-[6px] bg-slate-900 dark:bg-slate-200 " />
      <div className="ml-13 h-[6px] w-25 bg-slate-900 dark:bg-slate-200 " />
      <div className="translate-x-13 h-45 sm:h-54 w-[6px] bg-slate-900 dark:bg-slate-200 " />
      <div className="h-[6px] sm:w-28 bg-slate-900 dark:bg-slate-200 rounded-t-full" />
    </div>
  );
};

export default HangmanDrawing;
