import { createContext, useReducer, ReactNode } from "react";
import { requestReducer, initialState } from "../reducers/RequestsReducer";
import { FetchedRequestObj, StatusType } from "../types/Request";

export type RequestManagementContextType = {
  requestState: { all: []; pending: []; approved: []; rejected: [] };
  makeRequest: (req: any) => void;
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
  const [requestState, dispatch] = useReducer(requestReducer, initialState);

  const makeRequest = async (newRequest: any) => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/requests`;
    requestState.loading = true;

    console.log(newRequest);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newRequest),
      });

      if (!response.ok)
        throw new Error(`Failed to make request: ${response.status}`);

      const res = await response.json();
      // console.log(res);

      dispatch({
        type: "MAKE_REQUEST",
        payload: res,
      });
      // return res;
    } catch (error) {
      console.error("Error making request:", error);
      throw error;
    } finally {
      requestState.loading = false;
    }
  };

  const getAllRequests = async () => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/requests`;

    requestState.loading = true;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return;
      }

      const res = await response.json();
      dispatch({ type: "LIST_ALL_REQUESTS", payload: res.groupedRequests });
      return res;
    } catch (error) {
      console.error("Error fetching requests:", error);
      throw error;
    } finally {
      requestState.loading = false;
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
        requestState,
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
