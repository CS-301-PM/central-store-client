import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContextHook";
import { useRequestManagementContext } from "../../hooks/useRequestHook";
import { useApprovalManagementContext } from "../../hooks/useApprovalContext";
import RequestCard from "./RequestCard";

function Pending() {
  const { user } = useUserContext();
  const userRole = user?.user?.role;
  const department = user?.user?.department || "";

  const { requestState, getAllRequests } = useRequestManagementContext();
  const { approvalState, pendingApprovals } = useApprovalManagementContext();

  const [requests, setRequests] = useState<any[]>([]);

  // Fetch all requests & pending approvals once on mount
  useEffect(() => {
    if (userRole === "DEPARTMENT_HOD" || userRole === "STOREKEEPER") {
      // Department-specific roles only need all requests for their department
      getAllRequests();
    } else {
      // Other roles (PROCUREMENT_OFFICER, STORES_MANAGER, CFO, etc.)
      // only care about approvals assigned to them
      pendingApprovals();
    }
  }, [userRole]);

  // Update requests whenever approvalState changes
  useEffect(() => {
    // console.log(approvalState);

    setRequests(approvalState.approvals || []);
  }, [approvalState]);

  // Select which requests to show based on role
  let visibleRequests: any[] = [];

  if (userRole === "DEPARTMENT_HOD" || userRole === "STOREKEEPER") {
    visibleRequests = requestState?.pending || [];
  } else {
    visibleRequests = requests?.pending || [];
  }

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
      {visibleRequests.length > 0 ? (
        visibleRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))
      ) : (
        <p className="text-gray-500">No requests for {department}</p>
      )}
    </div>
  );
}

export default Pending;
