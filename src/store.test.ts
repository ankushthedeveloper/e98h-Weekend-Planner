import { MOCK_ACTIVITIES } from "./Types/type";
import { useWeekendStore } from "./state/ZustandState";

const initialState = useWeekendStore.getState();

describe("useWeekendStore", () => {
  // Reset store after each test
  afterEach(() => {
    useWeekendStore.setState(initialState);
  });

  it("should add an activity to a day", () => {
    // Get the action from the store
    const { addActivity } = useWeekendStore.getState();

    // Check initial state
    expect(useWeekendStore.getState().days["Saturday"]).toHaveLength(0);

    // Perform the action
    const activityToAdd = MOCK_ACTIVITIES[0];
    addActivity("Saturday", activityToAdd);

    // Check the new state
    const newState = useWeekendStore.getState();
    expect(newState.days["Saturday"]).toHaveLength(1);
    expect(newState.days["Saturday"][0].name).toBe(activityToAdd.name);
  });

  it("should remove an activity from a day", () => {
    const { addActivity, removeActivity } = useWeekendStore.getState();

    const activityToAdd = MOCK_ACTIVITIES[0];
    addActivity("Saturday", activityToAdd);

    // Get the scheduledId of the newly added activity
    const scheduledId =
      useWeekendStore.getState().days["Saturday"][0].scheduledId;

    removeActivity("Saturday", scheduledId);

    expect(useWeekendStore.getState().days["Saturday"]).toHaveLength(0);
  });
});
