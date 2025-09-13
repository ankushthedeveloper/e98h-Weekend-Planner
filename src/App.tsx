import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { MOCK_ACTIVITIES, THEMES, type Day } from "./assets/assets";
import { DraggableActivityOption } from "./components/DraggableActivityOption";
import { Navbar } from "./components/Navbar";
import { ScheduleDay } from "./components/ScheduleDay";
import { ShareModal } from "./components/ShareModal";
import { useWeekendStore } from "./state/ZustandState";
import { useState } from "react";
import { HolidayAwarenessBanner } from "./components/HolidayAwarenessBanner";
import { PlusCircle } from "lucide-react";

function App() {
  const { days, theme, addActivity, moveActivity, addDay } = useWeekendStore();
  const state = useWeekendStore.getState();
  const themeClasses = THEMES[theme];
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.data.current?.isOption) {
      const day = over.id as Day;
      const activity = active.data.current?.activity;
      if (activity && state.days[day]) {
        addActivity(day, activity);
      }
      return;
    }
    const sourceDay = active.data.current?.day as Day;
    if (!sourceDay) return;
    const destDay = (over.data.current?.day || over.id) as Day;
    const sourceIndex = state.days[sourceDay].findIndex(
      (a) => a.scheduledId === active.id
    );
    let destIndex = state.days[destDay].findIndex(
      (a) => a.scheduledId === over.id
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
    if (newDayName) {
      addDay(newDayName);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className={`${themeClasses.background} min-h-screen font-sans`}>
        <Navbar onShareClick={() => setShareModalOpen(true)} />
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <HolidayAwarenessBanner />
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/3 xl:w-1/4">
              <div className="sticky top-24">
                <h2
                  className={`text-xl font-bold ${themeClasses.titleText} mb-4`}
                >
                  Choose Activities
                </h2>
                <div className="space-y-3">
                  {MOCK_ACTIVITIES.map((activity) => (
                    <DraggableActivityOption
                      key={activity.id}
                      activity={activity}
                    />
                  ))}
                </div>
              </div>
            </aside>
            <section className="flex-1">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
                  Object.keys(days).length > 2 ? 3 : 2
                } gap-6`}
              >
                {Object.entries(days).map(([dayName, activities]) => (
                  <ScheduleDay
                    key={dayName}
                    day={dayName}
                    activities={activities}
                  />
                ))}
                <div className="flex items-center justify-center min-h-[400px]">
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
    </DndContext>
  );
}

export default App;
