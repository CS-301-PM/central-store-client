import { FetchedRequestObj, StatusType } from "../types/Request";

export const MAKE_REQUEST = "MAKE_REQUEST";
export const LIST_ALL_REQUESTS = "LIST_ALL_REQUESTS";
export const UPDATE_REQUEST_STATUS = "UPDATE_REQUEST_STATUS";

export interface RequestState {
  requests: FetchedRequestObj[];
  loading: boolean;
  error?: string | null;
}

export type RequestActionTypes =
  | { type: typeof MAKE_REQUEST; payload: FetchedRequestObj }
  | { type: typeof LIST_ALL_REQUESTS; payload: FetchedRequestObj[] }
  | {
      type: typeof UPDATE_REQUEST_STATUS;
      payload: { requestId: string; statusType: StatusType };
    };

// ----------------------
export const initialState: RequestState = {
  requests: [],
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
