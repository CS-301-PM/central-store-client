// context/OverviewContextProvider.tsx
import React, { useReducer, useState, useCallback } from "react";
import {
  overviewReducer,
  SET_OVERVIEW_COUNTS,
  SET_NOTIFICATIONS,
} from "../reducers/OverviewReducer";
import { OverviewContext } from "../hooks/useOverviewContext";
import { NotificationType } from "../types/overview";

export const OverviewContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(overviewReducer, {
    approved: 0,
    declined: 0,
    inProcess: 0,
    notifications: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOverviewData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Simulate fetching data from server
      const response = await new Promise<{
        counts: { approved: number; declined: number; inProcess: number };
        notifications: NotificationType[];
      }>((resolve) =>
        setTimeout(
          () =>
            resolve({
              counts: { approved: 15, declined: 4, inProcess: 6 },
              notifications: [
                {
                  id: "1",
                  message: "New request pending approval",
                  timestamp: new Date().toISOString(),
                },
                {
                  id: "2",
                  message: "Request declined by manager",
                  timestamp: new Date().toISOString(),
                },
              ],
            }),
          500
        )
      );

      dispatch({ type: SET_OVERVIEW_COUNTS, payload: response.counts });
      dispatch({ type: SET_NOTIFICATIONS, payload: response.notifications });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch overview data");
      setIsLoading(false);
    }
  }, []);

  return (
    <OverviewContext.Provider
      value={{
        approved: state.approved,
        declined: state.declined,
        inProcess: state.inProcess,
        notifications: state.notifications,
        fetchOverviewData,
        isLoading,
        error,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};
