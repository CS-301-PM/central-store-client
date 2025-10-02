import { StatusType } from "../types/Request";

export const MAKE_REQUEST = "MAKE_REQUEST";
export const LIST_ALL_REQUESTS = "LIST_ALL_REQUESTS";
export const UPDATE_REQUEST_STATUS = "UPDATE_REQUEST_STATUS";
export const REQUESTS_DASHBOARD = "REQUESTS_DASHBOARD";

export interface RequestState {
  requestState: any[];
  requestDashboard?: { [key: string]: any };
  loading: boolean;
  error?: string | null;
}

export type RequestActionTypes =
  | { type: typeof MAKE_REQUEST; payload: any }
  | { type: typeof LIST_ALL_REQUESTS; payload: any }
  | {
      type: typeof UPDATE_REQUEST_STATUS;
      payload: { requestId: string; statusType: StatusType };
    }
  | { type: typeof REQUESTS_DASHBOARD; payload: { [key: string]: any } };

// ----------------------
export const initialState: any = {
  requestState: { all: [], pending: [], approved: [], rejected: [] },
  requestDashboard: {},
  loading: false,
  error: null,
};

// ----------------------
export const requestReducer = (
  requestState: any = initialState,
  action: RequestActionTypes
): any => {
  switch (action.type) {
    case MAKE_REQUEST:
      // console.log(action.payload);
      return {
        ...requestState,
        requestState: {
          ...requestState,
          all: [action.payload, ...requestState.all],
          pending:
            action.payload.status === "PENDING"
              ? [action.payload, ...requestState.pending]
              : requestState.requestState.pending,
        },
      };

    case REQUESTS_DASHBOARD:
      return { ...requestState, requestDashboard: action.payload };
    case LIST_ALL_REQUESTS:
      console.log(action.payload);
      return {
        ...requestReducer,
        ...action.payload,
      };

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
      return requestState;
  }
};
