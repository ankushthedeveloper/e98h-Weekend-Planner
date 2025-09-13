import { Paintbrush, Check } from "lucide-react";
import { useState } from "react";
import { THEMES } from "../assets/assets";
import type { ThemeKey } from "../assets/assets";
import { useWeekendStore } from "../state/ZustandState";
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useWeekendStore();
  const [isOpen, setIsOpen] = useState(false);
  const themeClasses = THEMES[theme];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center rounded-full p-2.5 text-white shadow-sm ${themeClasses.primary} ${themeClasses.primaryHover} focus:outline-none focus:ring-2 ${themeClasses.primaryFocus} focus:ring-offset-2 transition-all duration-150`}
      >
        <Paintbrush className="h-4 w-4" />
      </button>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200"
        >
          {Object.keys(THEMES).map((key) => {
            const currentTheme = THEMES[key as ThemeKey];
            return (
              <button
                key={key}
                onClick={() => {
                  setTheme(key as ThemeKey);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{currentTheme.name}</span>
                {theme === key && (
                  <Check className={`h-4 w-4 ${currentTheme.primaryText}`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
