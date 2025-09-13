import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { THEMES, type Day, type ScheduledActivity } from "../assets/assets";
import { SortableActivityCard } from "./SortAbleActivityCard";
import { useDroppable } from "@dnd-kit/core";
import { useWeekendStore } from "../state/ZustandState";

export const ScheduleDay = ({
  day,
  activities,
}: {
  day: Day;
  activities: ScheduledActivity[];
}) => {
  const { setNodeRef } = useDroppable({ id: day });
  const { theme } = useWeekendStore();
  const themeClasses = THEMES[theme];
  const activityIds = activities.map((a) => a.scheduledId);

  return (
    <div className={`${themeClasses.card} p-4 rounded-xl shadow-sm`}>
      <h2
        className={`text-xl font-bold ${themeClasses.titleText} mb-4 text-center capitalize`}
      >
        {day}
      </h2>
      <SortableContext
        id={day}
        items={activityIds}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="space-y-3 min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50/50"
        >
          {activities.length > 0 ? (
            activities.map((activity) => (
              <SortableActivityCard
                key={activity.scheduledId}
                activity={activity}
                day={day}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Drag activities here</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};
