// Action Types
export const GET_LOGS_ANALYTICS = "GET_LOGS_ANALYTICS";
export const GET_STOCK_ANALYTICS = "GET_STOCK_ANALYTICS";
export const GET_REQUEST_ANALYTICS = "GET_REQUEST_ANALYTICS";
export const GET_APPROVALS_ANALYTICS = "GET_APPROVALS_ANALYTICS";

// State interface
interface Analytics {
  logs: any;
  stocks: any;
  requests: any;
  approvals: any;
}

// Initial state
const initialState: Analytics = {
  logs: {},
  stocks: {},
  requests: {},
  approvals: {},
};

// Action types
type AnalyticsActionTypes =
  | { type: typeof GET_LOGS_ANALYTICS; payload: any }
  | { type: typeof GET_STOCK_ANALYTICS; payload: any }
  | { type: typeof GET_REQUEST_ANALYTICS; payload: any }
  | { type: typeof GET_APPROVALS_ANALYTICS; payload: any };

// Reducer
export const analyticsReducer = (
  analyticsState: Analytics = initialState,
  action: AnalyticsActionTypes
): Analytics => {
  switch (action.type) {
    case GET_LOGS_ANALYTICS:
      return {
        ...analyticsState,
        logs: action.payload,
      };
    case GET_STOCK_ANALYTICS:
      return {
        ...analyticsState,
        stocks: action.payload,
      };
    case GET_REQUEST_ANALYTICS:
      return {
        ...analyticsState,
        requests: action.payload,
      };
    case GET_APPROVALS_ANALYTICS:
      return {
        ...analyticsState,
        approvals: action.payload,
      };
    default:
      return analyticsState;
  }
};
