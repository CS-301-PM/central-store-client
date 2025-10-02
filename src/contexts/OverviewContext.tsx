// context/OverviewContextProvider.tsx
import React, { useReducer, useState, useCallback } from "react";
import { OverviewContext } from "../hooks/useOverviewContext";
import {
  analyticsReducer,
  GET_LOGS_ANALYTICS,
  GET_STOCK_ANALYTICS,
  GET_REQUEST_ANALYTICS,
  GET_APPROVALS_ANALYTICS,
} from "../reducers/OverviewReducer";

export const OverviewContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [stateAnalytics, dispatch] = useReducer(analyticsReducer, {
    logs: {},
    stocks: {},
    requests: {},
    approvals: {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = JSON.parse(localStorage.getItem("user") || "{}");
  const accessToken = session.token;
  const SERVER_URL = import.meta.env.VITE_SERVER;

  const fetchAnalytics = useCallback(
    async (endpoint: string, actionType: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${SERVER_URL}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        dispatch({ type: actionType, payload: data });
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch analytics");
        setIsLoading(false);
      }
    },
    [accessToken, SERVER_URL]
  );

  // All analytics methods
  const getAnalyticsLogs = useCallback(async () => {
    await fetchAnalytics("api/analytics/logs", GET_LOGS_ANALYTICS);
  }, [fetchAnalytics]);

  const getAnalyticsStocks = useCallback(async () => {
    await fetchAnalytics("api/analytics/stocks", GET_STOCK_ANALYTICS);
  }, [fetchAnalytics]);

  const getAnalyticsRequests = useCallback(async () => {
    await fetchAnalytics("api/analytics/requests", GET_REQUEST_ANALYTICS);
  }, [fetchAnalytics]);

  const getAnalyticsApprovals = useCallback(async () => {
    await fetchAnalytics("api/analytics/approvals", GET_APPROVALS_ANALYTICS);
  }, [fetchAnalytics]);

  return (
    <OverviewContext.Provider
      value={{
        logs: stateAnalytics.logs,
        stocks: stateAnalytics.stocks,
        requests: stateAnalytics.requests,
        approvals: stateAnalytics.approvals,
        getAnalyticsLogs,
        getAnalyticsStocks,
        getAnalyticsRequests,
        getAnalyticsApprovals,
        isLoading,
        error,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};
