import { toPng } from "html-to-image";
import { CalendarDays, Download, X } from "lucide-react";
import { CATEGORIES, THEMES, type ScheduledActivity } from "../Types/type";
import { useWeekendStore } from "../state/ZustandState";
import { useRef } from "react";

export const ShareModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { days, theme } = useWeekendStore();
  const themeClasses = THEMES[theme];
  const posterRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (posterRef.current === null) return;
    toPng(posterRef.current, {
      cacheBust: true,
      backgroundColor: "white",
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "my-weekend-plan.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const PosterActivity = ({ activity }: { activity: ScheduledActivity }) => {
    const category = CATEGORIES[activity.category];
    const Icon = category.icon;
    return (
      <div className="flex items-center justify-between gap-3 p-2 bg-white/50 rounded-md">
        <div className="flex items-center gap-2">
          <div
            className={`flex-shrink-0 h-8 w-8 rounded-md ${category.color} flex items-center justify-center`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <p className="font-medium text-sm text-gray-700">{activity.name}</p>
        </div>
        {activity.vibe && <span className="text-lg">{activity.vibe}</span>}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          {" "}
          <X className="h-6 w-6" />{" "}
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Your Weekend Plan
        </h2>
        <div
          ref={posterRef}
          className={`p-8 rounded-lg ${themeClasses.background}`}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <CalendarDays className={`h-8 w-8 ${themeClasses.icon}`} />
            <span
              className={`text-3xl font-bold ${themeClasses.titleText} tracking-tight`}
            >
              Weekendly
            </span>
          </div>
          <div className={`grid grid-cols-${Object.keys(days).length} gap-6`}>
            {Object.entries(days).map(([dayName, activities]) => (
              <div key={dayName}>
                <h3
                  className={`text-lg font-bold ${themeClasses.titleText} mb-3 text-center`}
                >
                  {dayName}
                </h3>
                <div className="space-y-2">
                  {activities.length > 0 ? (
                    activities.map((act) => (
                      <PosterActivity key={act.scheduledId} activity={act} />
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm">
                      No plans yet!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownload}
            className={`flex items-center gap-2 rounded-md px-6 py-3 text-lg font-semibold text-white shadow-sm ${themeClasses.primary} ${themeClasses.primaryHover} focus:outline-none focus:ring-2 ${themeClasses.primaryFocus} focus:ring-offset-2 transition-all duration-150`}
          >
            <Download className="h-5 w-5" />
            <span>Download Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
