import { CalendarPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useWeekendStore } from "../state/ZustandState";
import Loading from "./Loading";

export type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
};

type LongWeekend = {
  name: string;
  days: string[];
};

export const HolidayAwarenessBanner = ({ scheduleRef }: any) => {
  const { setDays } = useWeekendStore();
  const [longWeekend, setLongWeekend] = useState<LongWeekend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findNextLongWeekend = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/holidays?country=IN`,
          {
            headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch holiday data.");
        }
        const holidays = await response.json();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcomingHolidays = holidays
          .filter((holiday: any) => new Date(holiday.date) >= today)
          .sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        for (const holiday of upcomingHolidays) {
          const holidayDate = new Date(holiday.date);
          const dayOfWeek = holidayDate.getDay();
          if (dayOfWeek === 1 || dayOfWeek === 5) {
            const weekendDays: string[] = [];
            const options: Intl.DateTimeFormatOptions = {
              weekday: "long",
              month: "short",
              day: "numeric",
            };

            if (dayOfWeek === 1) {
              weekendDays.push(
                new Date(
                  holidayDate.getTime() - 2 * 86400000
                ).toLocaleDateString("en-US", options)
              );
              weekendDays.push(
                new Date(
                  holidayDate.getTime() - 1 * 86400000
                ).toLocaleDateString("en-US", options)
              );
              weekendDays.push(
                holidayDate.toLocaleDateString("en-US", options)
              );
            } else {
              weekendDays.push(
                holidayDate.toLocaleDateString("en-US", options)
              );
              weekendDays.push(
                new Date(
                  holidayDate.getTime() + 1 * 86400000
                ).toLocaleDateString("en-US", options)
              );
              weekendDays.push(
                new Date(
                  holidayDate.getTime() + 2 * 86400000
                ).toLocaleDateString("en-US", options)
              );
            }

            setLongWeekend({
              name: holiday.name,
              days: weekendDays,
            });
            return;
          }
        }
      } catch (error) {
        console.error("Error finding next long weekend:", error);
      } finally {
        setLoading(false);
      }
    };

    findNextLongWeekend();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!longWeekend) {
    return null;
  }

  const handlePlanIt = () => {
    setDays(longWeekend.days);
    const yOffset = -100;
    const y =
      scheduleRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl shadow-lg mb-8 flex items-center justify-between flex-wrap gap-4">
      <div>
        <p className="font-bold text-lg">Plan Ahead!</p>
        <p className="text-sm">
          Upcoming Long Weekend: <strong>{longWeekend.name}</strong> (
          {longWeekend.days[0]})
        </p>
      </div>
      <button
        onClick={handlePlanIt}
        className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors flex-shrink-0"
      >
        <CalendarPlus className="h-5 w-5" />
        <span>Plan this Weekend</span>
      </button>
    </div>
  );
};
