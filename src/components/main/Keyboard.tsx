interface keyboardProps {
  guessedLetter: string[];
  onLetterClick: (letter: string) => void;
}

const Keyboard = ({ guessedLetter, onLetterClick }: keyboardProps) => {
  const alphabets: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const handleClick = (letter: string): void => {
    onLetterClick(letter);
  };

  return (
    <div className="w-full sm:w-4/5 mx-auto flex-center flex-wrap gap-2 sm:gap-3 px-1 py-2">
      {alphabets.map((letter) => (
        <button
          onClick={() => handleClick(letter)}
          key={letter}
          className={`${
            guessedLetter?.includes(letter) ? "inactive" : "active"
          } uppercase size-12 sm:size-16 rounded border-2 flex-center tex-lg sm:text-2xl font-semibold transition-all duration-100 sm:duration-150`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
