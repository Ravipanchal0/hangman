import { loseMessages } from "../../assets/assets";
import Lottie from "lottie-react";
import Game_lost from "../../assets/Json/sad_emotion.json";

interface GuessWord {
  word: string;
  desc: string | null;
}

interface WinProps {
  restart: () => void;
  word: GuessWord;
}

const Loss = ({ restart, word }: WinProps) => {
  const randomLoseMessage =
    loseMessages[Math.floor(Math.random() * loseMessages.length)];

  return (
    <div className="fixed w-full h-screen top-0 right-0 left-0 bg-black/30 flex-center z-50">
      <div className="w-60 sm:w-md bg-white dark:bg-slate-800 dark:text-slate-100 p-4 sm:p-8 rounded-lg flex-center flex-col animate-zoomIn">
        <div className="svg w-22 sm:w-36">
          <Lottie animationData={Game_lost} />
        </div>
        <div className="desc flex flex-col text-center">
          <span className="text-lx sm:text-3xl font-medium sm:mb-2 uppercase">
            {randomLoseMessage}
          </span>
          <p className="sm:text-lg mt-2 font-medium flex items-center flex-col">
            <span className="meaning text-xs">{word.desc}</span>
            <div className="word">
              The word was "
              <span className="capitalize italic text-blue-700 px-0.5">
                {word.word}
              </span>
              "
            </div>
          </p>
        </div>
        <div onClick={restart} className="btn mt-4 sm:mt-8 z-10">
          <button className="px-4 sm:px-8 py-1 sm:py-2 rounded-md bg-blue-300 text-slate-900 font-medium sm:text-lg cursor-pointer hover:bg-blue-400/70 active:scale-95 transition-all duration-150">
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loss;
