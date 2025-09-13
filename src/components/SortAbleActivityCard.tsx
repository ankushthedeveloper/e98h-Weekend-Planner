import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, MapPin, Trash2 } from "lucide-react";
import { type Day, type ScheduledActivity, CATEGORIES } from "../Types/type";
import { useWeekendStore } from "../state/ZustandState";
import { CSS } from "@dnd-kit/utilities";
import { VibeSelector } from "./VibeSelector";
import { memo } from "react";

export const SortableActivityCard = memo(
  ({ activity, day }: { activity: ScheduledActivity; day: Day }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: activity.scheduledId, data: { activity, day } });
    const style = { transform: CSS.Transform.toString(transform), transition };
    const { removeActivity, setVibe } = useWeekendStore();
    const category = CATEGORIES[activity.category];
    const Icon = category.icon;

    const openInGoogleMaps = () => {
      const query = encodeURIComponent(
        `${activity.name} near Sonipat, Haryana`
      );
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        "_blank"
      );
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="group flex flex-col p-3 bg-white rounded-lg shadow-sm border border-gray-200 touch-none space-y-2"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 flex-1">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab p-2 text-gray-400 hover:text-gray-700"
            >
              <GripVertical className="h-5 w-5" />
            </button>
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-lg ${category.color} flex items-center justify-center`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <p className="font-semibold text-gray-800">{activity.name}</p>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={openInGoogleMaps}
              className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-green-600"
              aria-label="Find on map"
            >
              <MapPin className="h-4 w-4" />
            </button>
            <button
              onClick={() => removeActivity(day, activity.scheduledId)}
              className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-600"
              aria-label={`Remove ${activity.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="pl-14">
          <VibeSelector
            selectedVibe={activity.vibe}
            onSelect={(vibe) => setVibe(day, activity.scheduledId, vibe)}
          />
        </div>
      </div>
    );
  }
);
