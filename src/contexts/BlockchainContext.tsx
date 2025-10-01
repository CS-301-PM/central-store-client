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

  // Fetch logs
  const getLogs = useCallback(async () => {
    const URL = `${import.meta.env.VITE_SERVER}api/blockchain`;
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
      dispatch({ type: GET_LOGS, payload: logs.items });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch logs");
      setIsLoading(false);
    }
  }, []);

  return (
    <BlockchainContext.Provider
      value={{
        getLogs,
        logs: state.logs,
        isLoading,
        error,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
