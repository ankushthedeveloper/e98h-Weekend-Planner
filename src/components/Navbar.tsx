import { CalendarDays, Menu, Share2, Trash2, User } from "lucide-react";
import { useState } from "react";
import { THEMES } from "../Types/type";
import { useWeekendStore } from "../state/ZustandState";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MobileMenu } from "./MobileMenu";
export const Navbar = ({ onShareClick }: { onShareClick: () => void }) => {
  const { theme, setDays } = useWeekendStore();
  const themeClasses = THEMES[theme];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleReset = () => {
    if (confirm("Are you sure you want to clear your entire plan?")) {
      setDays(["Saturday", "Sunday"]);
    }
  };

  return (
    <>
      <header
        className={`${themeClasses.header} backdrop-blur-md shadow-sm sticky top-0 z-50 w-full border-b border-gray-200`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className={`h-7 w-7 ${themeClasses.icon}`} />
              <span
                className={`text-2xl font-bold ${themeClasses.titleText} tracking-tight`}
              >
                Weekendly
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={onShareClick}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm ${themeClasses.primary} ${themeClasses.primaryHover} focus:outline-none focus:ring-2 ${themeClasses.primaryFocus} focus:ring-offset-2 transition-all duration-150`}
              >
                <Share2 className="h-4 w-4" /> <span>Share</span>
              </button>
              <ThemeSwitcher />
              <button
                onClick={handleReset}
                title="Reset Plan"
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-offset-2 ring-gray-300">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onShareClick={onShareClick}
      />
    </>
  );
};
