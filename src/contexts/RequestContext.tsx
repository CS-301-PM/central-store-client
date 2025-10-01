import { createContext, useReducer, ReactNode } from "react";
import {
  requestReducer,
  initialState,
  RequestState,
} from "../reducers/RequestsReducer";
import { FetchedRequestObj, RequestObj, StatusType } from "../types/Request";
// import { mockRequests } from "../utils/Constants";

export type RequestManagementContextType = {
  state: RequestState;
  makeRequest: (req: RequestObj) => void;
  getAllRequests: () => void;
  updateRequestStatus: (requestId: string, statusType: StatusType) => void;
  dashboardRequest: () => void;
};

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
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/requests`;

    state.loading = true;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newRequest),
      });

      if (!response.ok)
        throw new Error(`Failed to make request: ${response.status}`);

      const res = await response.json();

      dispatch({ type: "MAKE_REQUEST", payload: res });
      return res;
    } catch (error) {
      console.error("Error making request:", error);
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const getAllRequests = async () => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/requests`;

    state.loading = true;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        return;
      }

      const res = await response.json();
      // console.log("Fetched requests:", res);
      dispatch({ type: "LIST_ALL_REQUESTS", payload: res });
      return res;
    } catch (error) {
      console.error("Error fetching requests:", error);
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const updateRequestStatus = async (
    requestId: string,
    statusType: StatusType
  ) => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/requests/edit/${requestId}`;

    state.loading = true;

    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: statusType }),
      });

      if (!response.ok)
        throw new Error(`Failed to update status: ${response.status}`);

      const updatedRequest: FetchedRequestObj = await response.json();

      console.log(updatedRequest);

      dispatch({
        type: "UPDATE_REQUEST_STATUS",
        payload: { requestId, statusType },
      });

      return updatedRequest;
    } catch (error) {
      console.error("Error updating request status:", error);
      throw error;
    } finally {
      state.loading = false;
    }
  };

  const dashboardRequest = async () => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/requests/dashboard`;

    state.loading = true;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        // body: JSON.stringify({ status: statusType }),
      });

      if (!response.ok)
        throw new Error(`Failed to update status: ${response.status}`);

      const res = await response.json();

      dispatch({
        type: "REQUESTS_DASHBOARD",
        payload: res,
      });

      return res;
    } catch (error) {
      console.error("Error updating request status:", error);
      throw error;
    } finally {
      state.loading = false;
    }
  };

  return (
    <RequestManagementContext.Provider
      value={{
        state,
        makeRequest,
        getAllRequests,
        updateRequestStatus,
        dashboardRequest,
      }}
    >
      {children}
    </RequestManagementContext.Provider>
  );
};
