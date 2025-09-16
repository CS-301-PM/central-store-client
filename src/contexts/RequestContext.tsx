import { createContext, useReducer, ReactNode } from "react";
import {
  requestReducer,
  initialState,
  RequestState,
} from "../reducers/RequestsReducer";
import { FetchedRequestObj, RequestObj, StatusType } from "../types/Request";
import { mockRequests } from "../utils/Constants";

export type RequestManagementContextType = {
  state: RequestState;
  makeRequest: (req: RequestObj) => void;
  getAllRequests: () => void;
  updateRequestStatus: (requestId: string, statusType: StatusType) => void;
};

// ----------------------
// Context
// ----------------------
export const RequestManagementContext = createContext<
  RequestManagementContextType | undefined
>(undefined);

export const RequestManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  const makeRequest = async (newRequest: RequestObj) => {
    state.loading = true;
    const URL = `${import.meta.env.VITE_SERVER}/api/makerequests`;
    const res = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequest),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const request = await res.json();
    const respondedRequest: FetchedRequestObj = { ...request };
    dispatch({ type: "MAKE_REQUEST", payload: respondedRequest });
    state.loading = true;
  };

  const getAllRequests = async () => {
    state.loading = true;
    const URL = `${import.meta.env.VITE_SERVER}/api/request/getall`;
    const res = await fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(newRequest),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const requests = await res.json();
    dispatch({ type: "LIST_ALL_REQUESTS", payload: requests });
    state.loading = false;
  };

  const updateRequestStatus = async (
    requestId: string,
    statusType: StatusType
  ) => {
    state.loading = true;
    const URL = `${import.meta.env.VITE_SERVER}/api/request/update`;
    const res = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId, statusType }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    // const requests = await res.json();
    dispatch({
      type: "UPDATE_REQUEST_STATUS",
      payload: { requestId, statusType },
    });
    state.loading = false;
  };

  return (
    <RequestManagementContext.Provider
      value={{
        state,
        makeRequest,
        getAllRequests,
        updateRequestStatus,
      }}
    >
      {children}
    </RequestManagementContext.Provider>
  );
};
