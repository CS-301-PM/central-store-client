import { createContext, useReducer, ReactNode } from "react";
import { approvalReducer, initialState } from "../reducers/ApprovalReducer";

export type ApprovalManagementContextType = {
  approvalState: typeof initialState;
  pendingApprovals: () => Promise<void>;
  approve: (itemId: number) => Promise<any>;
  reject: (itemId: number, reason: string) => Promise<any>;
};

export const ApprovalManagementContext = createContext<
  ApprovalManagementContextType | undefined
>(undefined);

export const ApprovalManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [approvalState, dispatch] = useReducer(approvalReducer, initialState);

  const pendingApprovals = async () => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/approvals/pending`;

    dispatch({ type: "LOADING" });

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`Failed to make request: ${response.status}`);

      const res = await response.json();
      dispatch({ type: "PENDING", payload: res });
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const approve = async (itemId: number) => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/approvals/${itemId}/approve`;
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) return;

      const res = await response.json();
      dispatch({ type: "APPROVE", payload: res });
      return res;
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const reject = async (itemId: number, reason: string) => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
    const URL = `${import.meta.env.VITE_SERVER}api/approvals/${itemId}/reject`;

    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ reason }),
      });

      if (!response.ok) return;

      const res = await response.json();
      dispatch({ type: "REJECT", payload: res });
      return res;
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return (
    <ApprovalManagementContext.Provider
      value={{
        approvalState,
        pendingApprovals,
        approve,
        reject,
      }}
    >
      {children}
    </ApprovalManagementContext.Provider>
  );
};
