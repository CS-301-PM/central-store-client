import React, { useReducer, useCallback } from "react";
import {
  blockchainReducer,
  RECORD_LOGS,
  GET_LOGS,
} from "../reducers/BlockchainReducer";
import { BlockchainContext } from "../hooks/useBlockchainContextHook";
import { BlockchainLogType } from "../types/blockchain";

// Context Provider component
export const BlockchainContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(blockchainReducer, {
    logs: [],
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Record a new log
  const recordLogs = useCallback(async (log: BlockchainLogType) => {
    try {
      setIsLoading(true);
      // simulate API / blockchain call
      await new Promise((resolve) => setTimeout(resolve, 300));

      dispatch({ type: RECORD_LOGS, payload: log });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to record log");
      setIsLoading(false);
    }
  }, []);

  // Fetch logs
  const getLogs = useCallback(async () => {
    const URL = `${import.meta.env.VITE_SERVER}api/blockchain/all`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;

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
        throw new Error(`Failed to delete user: ${response.status}`);
      }

      const logs = await response.json();
      // console.log(logs.blocks);
      dispatch({ type: GET_LOGS, payload: logs.blocks });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch logs");
      setIsLoading(false);
    }
  }, []);

  const latestLog =
    state.logs.length > 0 ? state.logs[state.logs.length - 1] : null;

  return (
    <BlockchainContext.Provider
      value={{
        recordLogs,
        getLogs,
        logs: state.logs,
        latestLog,
        isLoading,
        error,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
