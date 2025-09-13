import { create } from "zustand";
import type {
  ScheduledActivity,
  Activity,
  Day,
  ThemeKey,
  Vibe,
} from "../Types/type";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

type WeekendStore = {
  days: { [key: Day]: ScheduledActivity[] };
  theme: ThemeKey;
  addActivity: (day: Day, activity: Activity) => void;
  removeActivity: (day: Day, scheduledId: string) => void;
  moveActivity: (
    sourceDay: Day,
    destDay: Day,
    sourceIndex: number,
    destIndex: number
  ) => void;
  setTheme: (theme: ThemeKey) => void;
  addDay: (dayName: Day) => void;
  setDays: (dayNames: Day[]) => void;
  setVibe: (day: Day, scheduledId: string, vibe: Vibe) => void;
};

export const useWeekendStore = create<WeekendStore>()(
  persist(
    (set) => ({
      days: { Saturday: [], Sunday: [] },
      theme: "default",
      addActivity: (day, activity) =>
        set((state) => ({
          days: {
            ...state.days,
            [day]: [...state.days[day], { ...activity, scheduledId: uuidv4() }],
          },
        })),
      removeActivity: (day, scheduledId) =>
        set((state) => ({
          days: {
            ...state.days,
            [day]: state.days[day].filter(
              (act) => act.scheduledId !== scheduledId
            ),
          },
        })),
      moveActivity: (sourceDay, destDay, sourceIndex, destIndex) =>
        set((state) => {
          const newDays = { ...state.days };
          const sourceList = [...newDays[sourceDay]];
          const destList =
            sourceDay === destDay ? sourceList : [...newDays[destDay]];
          const [movedItem] = sourceList.splice(sourceIndex, 1);
          destList.splice(destIndex, 0, movedItem);
          newDays[sourceDay] = sourceList;
          newDays[destDay] = destList;
          return { days: newDays };
        }),
      setTheme: (theme) => set({ theme }),
      addDay: (dayName) =>
        set((state) => ({ days: { ...state.days, [dayName]: [] } })),
      setDays: (dayNames) => {
        const newDays: { [key: Day]: ScheduledActivity[] } = {};
        dayNames.forEach((name) => (newDays[name] = []));
        set({ days: newDays });
      },
      setVibe: (day, scheduledId, vibe) =>
        set((state) => {
          const newDays = { ...state.days };
          const dayActivities = newDays[day].map((act) =>
            act.scheduledId === scheduledId ? { ...act, vibe } : act
          );
          newDays[day] = dayActivities;
          return { days: newDays };
        }),
    }),
    { name: "weekendly-storage" }
  )
);
