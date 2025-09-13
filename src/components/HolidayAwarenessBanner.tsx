import { CalendarPlus } from "lucide-react";
import { useWeekendStore } from "../state/ZustandState";

export const HolidayAwarenessBanner = () => {
  const { setDays } = useWeekendStore();
  const upcomingLongWeekend = {
    name: "Gandhi Jayanti Long Weekend",
    days: ["Friday, Oct 3", "Saturday, Oct 4", "Sunday, Oct 5"],
  };
  const handlePlanIt = () => setDays(upcomingLongWeekend.days);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl shadow-lg mb-8 flex items-center justify-between">
      <div>
        <p className="font-bold text-lg">Plan Ahead!</p>
        <p className="text-sm">
          Upcoming Long Weekend: {upcomingLongWeekend.name}
        </p>
      </div>
      <button
        onClick={handlePlanIt}
        className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
      >
        <CalendarPlus className="h-5 w-5" />
        <span>Plan this Weekend</span>
      </button>
    </div>
  );
};
