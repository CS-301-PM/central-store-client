// hooks/useOverviewContext.ts
import { createContext, useContext } from "react";
import { NotificationType } from "../types/overview";

interface OverviewContextType {
  approved: number;
  declined: number;
  inProcess: number;
  notifications: NotificationType[];
  fetchOverviewData: () => Promise<void>; // fetch both counts & notifications
  isLoading: boolean;
  error: string | null;
}

const initialState: OverviewContextType = {
  approved: 0,
  declined: 0,
  inProcess: 0,
  notifications: [],
  fetchOverviewData: async () => Promise.resolve(),
  isLoading: false,
  error: null,
};

export const OverviewContext = createContext<OverviewContextType>(initialState);

export const useOverviewContext = (): OverviewContextType => {
  const context = useContext(OverviewContext);
  if (!context)
    throw new Error(
      "useOverviewContext must be used within OverviewContextProvider"
    );
  return context;
};
