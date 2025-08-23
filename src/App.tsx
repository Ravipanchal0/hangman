import { useEffect, useState } from "react";
import { wordLibrary } from "./assets/assets";

import { FaArrowsRotate } from "react-icons/fa6";

import Keyboard from "./components/main/Keyboard";
import HangmanWord from "./components/main/HangmanWord";
import HangmanDrawing from "./components/main/HangmanDrawing";
import Loss from "./components/result/Loss";
import Win from "./components/result/Win";
import ThemeToggle from "./utils/ThemeToggle";

const App = () => {
  interface GuessWord {
    word: string;
    desc: string;
  }

  const getRandomWord = (): GuessWord => {
    return wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
  };

  const [wordToGuess, setWordToGuess] = useState<GuessWord>(getRandomWord);
  const [guessedLetter, setGuessedLetter] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);

  const restart = (): GuessWord => {
    const fresh = getRandomWord();
    setWordToGuess(fresh);
    setGuessedLetter([]);
    setIncorrectLetters([]);
    setIsWinner(false);
    setIsLoser(false);
    return fresh;
  };

  const handleLetterClick = (letter: string) => {
    // prevent input when game over
    if (isWinner || isLoser) return;

    if (!guessedLetter.includes(letter)) {
      setGuessedLetter((prev) => [...prev, letter]);

      // update incorrect if not in the word
      if (!wordToGuess.word.includes(letter)) {
        setIncorrectLetters((prev) => [...prev, letter]);
      }
    }
  };

  // compute win/lose whenever letters or word changes
  useEffect(() => {
    const won = wordToGuess.word
      .split("")
      .every((ch) => guessedLetter.includes(ch));
    setIsWinner(won);

    const lost = incorrectLetters.length >= 6;
    setIsLoser(lost);
  }, [guessedLetter, incorrectLetters, wordToGuess]);

  return (
    <>
      {isLoser && <Loss restart={restart} word={wordToGuess.word} />}
      {isWinner && <Win restart={restart} />}

      <div className="w-full sm:max-w-4xl mx-auto flex-center flex-col gap-y-4">
        <header className="w-full p-2 sm:p-3 pb-0 flex items-center justify-between">
          <div className="logo font-bold text-2xl sm:text-3xl text-slate-800 dark:text-slate-300">
            HANGMAN
          </div>
          <div className="btns flex-center gap-4">
            <button
              title="Restart"
              onClick={restart}
              className="flex-center shadow-md dark:shadow-slate-500/40 size-10 p-1 rounded-md bg-blue-50 cursor-pointer border border-blue-100 hover:bg-blue-100/80 text-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-500 dark:hover:bg-slate-700/80"
            >
              <FaArrowsRotate className="" />
            </button>
            <ThemeToggle />
          </div>
        </header>
        <div className="hangman mt-3">
          <HangmanDrawing noOfGuesses={incorrectLetters.length} />
        </div>
        <div className="keyboard w-full">
          <div className="word-input w-full">
            <HangmanWord word={wordToGuess} guessedLetter={guessedLetter} />
          </div>
          <div className="keys w-full">
            <Keyboard
              guessedLetter={guessedLetter}
              onLetterClick={handleLetterClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
