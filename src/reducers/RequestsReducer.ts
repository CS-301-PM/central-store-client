import { FetchedRequestObj, StatusType } from "../types/Request";

export const MAKE_REQUEST = "MAKE_REQUEST";
export const LIST_ALL_REQUESTS = "LIST_ALL_REQUESTS";
export const UPDATE_REQUEST_STATUS = "UPDATE_REQUEST_STATUS";
export const REQUESTS_DASHBOARD = "REQUESTS_DASHBOARD";

export interface RequestState {
  requests: FetchedRequestObj[];
  requestDashboard?: { [key: string]: any };
  loading: boolean;
  error?: string | null;
}

export type RequestActionTypes =
  | { type: typeof MAKE_REQUEST; payload: FetchedRequestObj }
  | { type: typeof LIST_ALL_REQUESTS; payload: FetchedRequestObj[] }
  | {
      type: typeof UPDATE_REQUEST_STATUS;
      payload: { requestId: string; statusType: StatusType };
    }
  | { type: typeof REQUESTS_DASHBOARD; payload: { [key: string]: any } };

// ----------------------
export const initialState: RequestState = {
  requests: [],
  requestDashboard: {},
  loading: false,
  error: null,
};

// ----------------------
export const requestReducer = (
  state: RequestState = initialState,
  action: RequestActionTypes
): RequestState => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    case REQUESTS_DASHBOARD:
      return { ...state, requestDashboard: action.payload };
    case LIST_ALL_REQUESTS:
      return { ...state, requests: action.payload };

    case UPDATE_REQUEST_STATUS:
      return {
        ...state,
        requests: state.requests.map((req) =>
          req.requestId === action.payload.requestId
            ? { ...req, status: action.payload.statusType }
            : req
        ),
      };

    default:
      return state;
  }
};
