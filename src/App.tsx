import {
  closestCenter,
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import {
  MOCK_ACTIVITIES,
  THEMES,
  type Activity,
  type Day,
  type ScheduledActivity,
} from "./Types/type";
import { DraggableActivityOption } from "./components/DraggableActivityOption";
import { HolidayAwarenessBanner } from "./components/HolidayAwarenessBanner";
import { Navbar } from "./components/Navbar";
import { ScheduleDay } from "./components/ScheduleDay";
import { ShareModal } from "./components/ShareModal";
import { SortableActivityCard } from "./components/SortAbleActivityCard";
import { useWeekendStore } from "./state/ZustandState";

function App() {
  const { days, theme, addActivity, moveActivity, addDay } = useWeekendStore();
  const state = useWeekendStore.getState();
  const themeClasses = THEMES[theme];
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const scheduleSectionRef = useRef<HTMLElement>(null);

  const [activeActivity, setActiveActivity] = useState<
    Activity | ScheduledActivity | null
  >(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activityData = active.data.current?.activity;
    if (activityData) {
      setActiveActivity(activityData);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveActivity(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    const destDay = (overData?.day || over.id) as Day;
    if (!state.days[destDay]) return;

    if (activeData?.isOption) {
      const activity = activeData.activity as Activity;
      if (activity) {
        if (days[destDay].length >= 3) {
          alert("You can only add up to 3 activities per day.");
          return;
        }
        addActivity(destDay, activity);
      }
      return;
    }

    const sourceDay = activeData?.day as Day;
    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId === overId && sourceDay === destDay) return;

    const sourceIndex = state.days[sourceDay]?.findIndex(
      (a) => a.scheduledId === activeId
    );
    let destIndex = state.days[destDay]?.findIndex(
      (a) => a.scheduledId === overId
    );
    if (destIndex < 0) {
      destIndex = state.days[destDay].length;
    }

    if (sourceIndex > -1) {
      moveActivity(sourceDay, destDay, sourceIndex, destIndex);
    }
  };

  const handleAddDay = () => {
    const newDayName = prompt("Enter the name for the new day (e.g., Friday):");
    if (newDayName && !state.days[newDayName]) {
      addDay(newDayName);
    } else if (newDayName) {
      alert("A day with this name already exists.");
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div className={`${themeClasses.background} min-h-screen font-sans`}>
        <Navbar onShareClick={() => setShareModalOpen(true)} />
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <HolidayAwarenessBanner scheduleRef={scheduleSectionRef} />
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/3 xl:w-1/4">
              <div className="sticky top-24">
                <h2
                  className={`text-xl font-bold ${themeClasses.titleText} mb-4`}
                >
                  Choose Activities
                </h2>
                <div className="space-y-3 h-[60vh] pb-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {MOCK_ACTIVITIES.map((activity) => (
                    <DraggableActivityOption
                      key={activity.id}
                      activity={activity}
                    />
                  ))}
                </div>
              </div>
            </aside>
            <section ref={scheduleSectionRef} className="flex-1">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6`}
              >
                {Object.entries(days).map(([dayName, activities]) => (
                  <ScheduleDay
                    key={dayName}
                    day={dayName}
                    activities={activities}
                  />
                ))}
                <div className="flex items-center justify-center min-h-[100px]">
                  <button
                    onClick={handleAddDay}
                    className="flex flex-col items-center justify-center w-full h-full bg-gray-100/50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-200/50 transition-colors"
                  >
                    <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-gray-500 font-semibold">Add Day</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />
      </div>
      <DragOverlay dropAnimation={null}>
        {activeActivity ? (
          "scheduledId" in activeActivity ? (
            <SortableActivityCard activity={activeActivity} day="" />
          ) : (
            <DraggableActivityOption activity={activeActivity} />
          )
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
