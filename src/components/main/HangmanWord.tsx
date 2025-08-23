interface Word {
  word: string;
  desc: string;
}

interface HangmanWordProps {
  word: Word;
  guessedLetter: string[];
}

const HangmanWord = ({ word, guessedLetter }: HangmanWordProps) => {
  const guessingWord: Word = word;
  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center gap-x-2 sm:gap-x-3 text-4xl font-bold font-mono uppercase dark:text-slate-100 px-2">
        {guessingWord.word.split("").map((letter: string, index: number) => (
          <span
            key={index}
            className="border-b-2 dark:text-slate-300 dark:border-slate-400 px-1 sm:px-2 text-center inline-block"
          >
            <span
              className={
                guessedLetter?.includes(letter) ? "inline" : "invisible"
              }
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
      <div className="hint w-full sm:w-4/5 mx-auto p-2 text-center text-lg font-medium my-2 sm:my-4 border-y sm:border border-slate-200 bg-blue-50 dark:bg-slate-400 dark:border-slate-800 dark:text-slate-950 sm:rounded">
        {guessingWord.desc}
      </div>
    </div>
  );
};

export default HangmanWord;
