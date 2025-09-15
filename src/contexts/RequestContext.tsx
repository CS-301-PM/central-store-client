import { createContext, useReducer, ReactNode } from "react";
import {
  requestReducer,
  initialState,
  RequestState,
} from "../reducers/RequestsReducer";
import { FetchedRequestObj, RequestObj, StatusType } from "../types/Request";
import { mockRequests } from "../utils/Constants";

// ----------------------
// Context Type
// ----------------------
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

// ----------------------
// Provider
// ----------------------
export const RequestManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  const makeRequest = (newRequest: RequestObj) => {
    state.loading = true;
    // add the responded req from the server on the payload
    const respondedRequest: FetchedRequestObj = { ...newRequest };
    dispatch({ type: "MAKE_REQUEST", payload: respondedRequest });
    state.loading = true;
  };

  const getAllRequests = () => {
    state.loading = true;
    dispatch({ type: "LIST_ALL_REQUESTS", payload: mockRequests });
    state.loading = false;
  };

  const updateRequestStatus = (requestId: string, statusType: StatusType) => {
    // send the update to the server.
    console.log(requestId, statusType);
    state.loading = true;
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
