import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (dark) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center shadow-md dark:shadow-slate-500/40 size-10 p-1 rounded-md bg-blue-50 cursor-pointer border border-blue-100 hover:bg-blue-100/80 text-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-500 dark:hover:bg-slate-700/80"
    >
      {dark ? <IoSunny /> : <IoMoon />}
    </button>
  );
}
