// hooks/useOverviewContext.ts
import { createContext, useContext } from "react";

type AnalyticsActionType = {
  getAnalyticsLogs: () => Promise<void>;
  getAnalyticsStocks: () => Promise<void>;
  getAnalyticsRequests: () => Promise<void>;
  getAnalyticsApprovals: () => Promise<void>;
  logs: any;
  stocks: any;
  requests: any;
  approvals: any;
  isLoading: boolean;
  error: string | null;
};

const initialState: AnalyticsActionType = {
  getAnalyticsLogs: async () => {},
  getAnalyticsStocks: async () => {},
  getAnalyticsRequests: async () => {},
  getAnalyticsApprovals: async () => {},
  logs: {},
  stocks: {},
  requests: {},
  approvals: {},
  isLoading: true,
  error: null,
};

export const OverviewContext = createContext<AnalyticsActionType>(initialState);

export const useOverviewContext = (): AnalyticsActionType => {
  const context = useContext(OverviewContext);
  if (!context) {
    throw new Error(
      "useOverviewContext must be used within an OverviewContextProvider"
    );
  }
  return context;
};
