import RequestTableHeader from "../../components/other/RequestTableHeader";
import { Role } from "../../types/User";
import EnhancedTable from "../../components/other/RequestTable";
import ReusableModal from "../../components/other/Modal";
import NewRequest from "../Department/NewRequest";

function Requests({ role }: { role: Role }) {
  return (
    <div className="">
      <RequestTableHeader
        title="Department requests"
        subtitle="All pending and approved requests"
      >
        {role === "DEPARTMENT_DEAN" && (
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
      <EnhancedTable role={role} />
    </div>
  );
}

export default Requests;
