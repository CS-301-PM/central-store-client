// reducers/overviewReducer.ts
import { NotificationType } from "../types/overview";

// Action Types
export const SET_OVERVIEW_COUNTS = "SET_OVERVIEW_COUNTS";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

interface OverviewState {
  approved: number;
  declined: number;
  inProcess: number;
  notifications: NotificationType[];
}

// Initial state
const initialState: OverviewState = {
  approved: 0,
  declined: 0,
  inProcess: 0,
  notifications: [],
};

type OverviewActionTypes =
  | {
      type: typeof SET_OVERVIEW_COUNTS;
      payload: { approved: number; declined: number; inProcess: number };
    }
  | { type: typeof SET_NOTIFICATIONS; payload: NotificationType[] };

export const overviewReducer = (
  state: OverviewState = initialState,
  action: OverviewActionTypes
): OverviewState => {
  switch (action.type) {
    case SET_OVERVIEW_COUNTS:
      return { ...state, ...action.payload };
    case SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};
