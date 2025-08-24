import { useEffect, useState } from "react";
import Keyboard from "./components/main/Keyboard";
import HangmanWord from "./components/main/HangmanWord";
import HangmanDrawing from "./components/main/HangmanDrawing";
import Loss from "./components/result/Loss";
import Win from "./components/result/Win";
import ThemeToggle from "./utils/ThemeToggle";
import { FaArrowsRotate } from "react-icons/fa6";

const App = () => {
  interface GuessWord {
    word: string;
    desc: string;
  }

  // Fetch random word + definition
  const fetchGameWord = async (): Promise<GuessWord> => {
    try {
      const res = await fetch("https://random-word-api.herokuapp.com/word");
      const data = await res.json();
      const word = data[0];
      console.log(word);

      const defRes = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const defData = await defRes.json();

      const definition =
        defData[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
        "No definition found.";

      return { word, desc: definition };
    } catch (err) {
      console.error("Error fetching word:", err);
      return { word: "error", desc: "Could not fetch word." };
    }
  };

  // Load initial word
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchGameWord();
      setWordToGuess(data);
      setLoading(false);
    })();
  }, []);

  const [wordToGuess, setWordToGuess] = useState<GuessWord | null>(null);
  const [guessedLetter, setGuessedLetter] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restart game
  const restart = async () => {
    setLoading(true);
    const fresh = await fetchGameWord();
    setWordToGuess(fresh);
    setGuessedLetter([]);
    setIncorrectLetters([]);
    setIsWinner(false);
    setIsLoser(false);
    setLoading(false);
  };

  // Handle guesses
  const handleLetterClick = (letter: string) => {
    if (isWinner || isLoser || !wordToGuess) return;

    if (!guessedLetter.includes(letter)) {
      setGuessedLetter((prev) => [...prev, letter]);

      if (!wordToGuess.word.includes(letter)) {
        setIncorrectLetters((prev) => [...prev, letter]);
      }
    }
  };

  // Win/Loss check
  useEffect(() => {
    if (!wordToGuess) return;

    const won = wordToGuess.word
      .split("")
      .every((ch) => guessedLetter.includes(ch));
    setIsWinner(won);

    const lost = incorrectLetters.length >= 6;
    setIsLoser(lost);
  }, [guessedLetter, incorrectLetters, wordToGuess]);

  // Loading state
  if (loading || !wordToGuess) {
    return (
      <div className="flex-center w-full h-screen text-xl text-slate-600 dark:text-slate-300">
        Loading word...
      </div>
    );
  }

  return (
    <>
      {isLoser && <Loss restart={restart} word={wordToGuess} />}
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
        <div className="hangman">
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
