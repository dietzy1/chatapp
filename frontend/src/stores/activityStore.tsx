import { create } from "zustand";

export interface ActivityStore {
  activity: string[];
  addActivity: (activity: string[]) => void;
}

const useActivityStore = create<ActivityStore>((set) => ({
  activity: [],
  addActivity: (activity) => set({ activity: activity }),
}));

export default useActivityStore;
