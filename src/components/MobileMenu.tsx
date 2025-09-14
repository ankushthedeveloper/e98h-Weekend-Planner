import { Share2, Trash2, X } from "lucide-react";
import { THEMES } from "../Types/type";
import { useWeekendStore } from "../state/ZustandState";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const MobileMenu = ({
  isOpen,
  onClose,
  onShareClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onShareClick: () => void;
}) => {
  const { setDays, theme } = useWeekendStore();
  const themeClasses = THEMES[theme];

  if (!isOpen) return null;

  const handleReset = () => {
    if (confirm("Are you sure you want to clear your entire plan?")) {
      setDays(["Saturday", "Sunday"]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100]" onClick={onClose}>
      <div
        className="absolute top-4 right-4 w-64 bg-white rounded-xl shadow-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-gray-700">Menu</p>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-2">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase">
            Appearance
          </p>
          <ThemeSwitcher />
          <p className="px-3 pt-3 text-xs font-semibold text-gray-400 uppercase">
            Actions
          </p>
          <button
            onClick={() => {
              onShareClick();
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100`}
          >
            <Share2 className={`h-5 w-5 ${themeClasses.primaryText}`} />
            <span className="font-medium">Share Plan</span>
          </button>
          <button
            onClick={handleReset}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50`}
          >
            <Trash2 className="h-5 w-5" />
            <span className="font-medium">Reset Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
