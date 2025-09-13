import { memo } from "react";
import { CATEGORIES, type Activity } from "../assets/assets";
import { useDraggable } from "@dnd-kit/core";

export const DraggableActivityOption = memo(
  ({ activity }: { activity: Activity }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: `option-${activity.id}`,
      data: { activity, isOption: true },
    });
    const style = transform
      ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
      : undefined;
    const category = CATEGORIES[activity.category];
    const Icon = category.icon;

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="touch-none"
      >
        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab">
          <div className="flex items-center gap-3">
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-lg ${category.color} flex items-center justify-center`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              {" "}
              <p className="font-semibold text-gray-800">
                {activity.name}
              </p>{" "}
              <p
                className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${category.color}`}
              >
                {category.name}
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
