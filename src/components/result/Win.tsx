import { winMessages } from "../../assets/assets";
import Lottie from "lottie-react";
import Trophy from "../../assets/Json/Trophy.json";
import Confetti from "../../assets/Json/Confetti.json";

interface WinProps {
  restart: () => void;
}

const Win = ({ restart }: WinProps) => {
  const randomMessage =
    winMessages[Math.floor(Math.random() * winMessages.length)];

  return (
    <div className="fixed w-full h-screen top-0 right-0 left-0 bg-black/50 flex-center z-50 ">
      <div className="w-60 sm:w-md bg-white dark:bg-slate-800 dark:text-slate-100 p-4 sm:p-8 rounded-lg flex-center flex-col animate-zoomIn">
        <div className="svg w-22 sm:w-36">
          <Lottie animationData={Trophy} />
        </div>
        <div className=" relative desc flex-center flex-col">
          <span className="text-lx sm:text-3xl font-medium sm:mb-2 uppercase">
            Hurray! {randomMessage}
          </span>
          <div className="absolute -bottom-16 w-full">
            <Lottie animationData={Confetti} />
          </div>
        </div>
        <div className="btn mt-4 sm:mt-8 z-10">
          <button
            onClick={restart}
            className="px-4 sm:px-8 py-1 sm:py-2 rounded-md bg-blue-300 text-slate-900 font-medium sm:text-lg cursor-pointer hover:bg-blue-400/70 active:scale-95 transition-all duration-150"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Win;
