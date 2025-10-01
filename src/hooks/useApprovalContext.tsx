import { useContext } from "react";
import {
  ApprovalManagementContext,
  ApprovalManagementContextType,
} from "../contexts/ApprovalContext";

export const useApprovalManagementContext =
  (): ApprovalManagementContextType => {
    const context = useContext(ApprovalManagementContext);
    if (!context) {
      throw new Error(
        "useApprovalManagementContext must be used within an ApprovalManagementProvider"
      );
    }
    return context;
  };
