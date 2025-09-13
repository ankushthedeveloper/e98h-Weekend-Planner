import { Share2, User, CalendarDays } from "lucide-react";
import { THEMES } from "../assets/assets";
import { useWeekendStore } from "../state/ZustandState";
import { ThemeSwitcher } from "./ThemeSwitcher";
export const Navbar = ({ onShareClick }: { onShareClick: () => void }) => {
  const { theme } = useWeekendStore();
  const themeClasses = THEMES[theme];

  return (
    <header
      className={`${themeClasses.header} backdrop-blur-md shadow-sm sticky top-0 z-50 w-full border-b border-gray-200`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {" "}
            <CalendarDays className={`h-7 w-7 ${themeClasses.icon}`} />{" "}
            <span
              className={`text-2xl font-bold ${themeClasses.titleText} tracking-tight`}
            >
              Weekendly
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onShareClick}
              className={`hidden sm:flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm ${themeClasses.primary} ${themeClasses.primaryHover} focus:outline-none focus:ring-2 ${themeClasses.primaryFocus} focus:ring-offset-2 transition-all duration-150`}
            >
              {" "}
              <Share2 className="h-4 w-4" /> <span>Share</span>
            </button>
            <button
              onClick={onShareClick}
              className={`sm:hidden flex items-center justify-center rounded-full p-2.5 text-white shadow-sm ${themeClasses.primary} ${themeClasses.primaryHover} focus:outline-none focus:ring-2 ${themeClasses.primaryFocus} focus:ring-offset-2 transition-all duration-150`}
            >
              <Share2 className="h-4 w-4" />
            </button>
            <ThemeSwitcher />
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-offset-2 ring-gray-300">
              <User className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
