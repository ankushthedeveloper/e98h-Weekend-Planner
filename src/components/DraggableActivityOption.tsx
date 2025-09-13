import { memo } from "react";
import { CATEGORIES, type Activity } from "../Types/type";
import { useDraggable } from "@dnd-kit/core";

export const DraggableActivityOption = memo(
  ({ activity }: { activity: Activity }) => {
    // We only need listeners and attributes. The visual clone is handled by DragOverlay.
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: `option-${activity.id}`,
      data: { activity, isOption: true },
    });

    // No style changes are needed for the original item. It remains static.
    const category = CATEGORIES[activity.category];
    const Icon = category.icon;

    return (
      <div ref={setNodeRef} className="touch-none">
        <div
          {...listeners}
          {...attributes}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-lg ${category.color} flex items-center justify-center`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{activity.name}</p>
              <p
                className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${category.color}`}
              >
                {category.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
