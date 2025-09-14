import { MOCK_ACTIVITIES } from "./Types/type";
import { useWeekendStore } from "./state/ZustandState";

const initialState = useWeekendStore.getState();

describe("useWeekendStore", () => {
  afterEach(() => {
    useWeekendStore.setState(initialState);
  });

  it("should add an activity to a day", () => {
    const { addActivity } = useWeekendStore.getState();

    
    expect(useWeekendStore.getState().days["Saturday"]).toHaveLength(0);
    const activityToAdd = MOCK_ACTIVITIES[0];
    addActivity("Saturday", activityToAdd);
    const newState = useWeekendStore.getState();
    expect(newState.days["Saturday"]).toHaveLength(1);
    expect(newState.days["Saturday"][0].name).toBe(activityToAdd.name);
  });

  it("should remove an activity from a day", () => {
    const { addActivity, removeActivity } = useWeekendStore.getState();

    const activityToAdd = MOCK_ACTIVITIES[0];
    addActivity("Saturday", activityToAdd);

    const scheduledId =
      useWeekendStore.getState().days["Saturday"][0].scheduledId;

    removeActivity("Saturday", scheduledId);

    expect(useWeekendStore.getState().days["Saturday"]).toHaveLength(0);
  });
});
