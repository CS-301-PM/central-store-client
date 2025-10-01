import RequestTableHeader from "../../components/other/RequestTableHeader";
import { Role } from "../../types/User";
import EnhancedTable from "../../components/other/RequestTable";
import ReusableModal from "../../components/other/Modal";
import NewRequest from "../Department/NewRequest";
import ApprovalChain from "../../components/other/ApprovalChain";
import { useRequestManagementContext } from "../../hooks/useRequestHook";
import { useEffect } from "react";
import { useApprovalManagementContext } from "../../hooks/useApprovalContext";

function Requests({ role }: { role: Role }) {
  const { state, getAllRequests } = useRequestManagementContext();

  const { approvalState, pendingApprovals, approve, reject } =
    useApprovalManagementContext();

  useEffect(() => {
    getAllRequests();
    pendingApprovals();
  }, []);

  console.log(approvalState);
  console.log(state);
  return (
    <div className="">
      <RequestTableHeader
        title="Department requests"
        subtitle="All pending and approved requests"
      >
        {role === "DEPARTMENT_HOD" && (
          <ReusableModal
            color="primary"
            variant={"contained"}
            buttonLabel="New Request"
            title="Create new request"
          >
            <NewRequest />
          </ReusableModal>
        )}
      </RequestTableHeader>

      {/* <ApprovalChain
        title="Office Supplies Request #2024-002"
        steps={[
          {
            id: "1",
            role: "Procurement Officer",
            status: "approved",
            approverName: "John Doe",
            timestamp: "2025-09-28T10:30:00Z",
          },
          {
            id: "2",
            role: "Inventory Manager",
            status: "pending",
            approverName: null,
            timestamp: null,
          },
          {
            id: "3",
            role: "CFO",
            status: "locked",
            approverName: null,
            timestamp: null,
          },
        ]}
        currentUserRole={"Inve"}
        onStepAction={() => {
          alert();
        }}
      /> */}
      {/* <EnhancedTable role={role} /> */}
    </div>
  );
}

export default Requests;
