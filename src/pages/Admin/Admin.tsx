import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import UsersTablePage from "./Users";
import { Role } from "../../types/User";
import ReusableModal from "../../components/other/Modal";
import NewUserForm from "../Auth/NewUserForm";

function Admin({ role }: { role: Role }) {
  return (
    <div className="p-2">
      <RequestTableHeader
        title="Manage all users"
        subtitle="View and manage users."
      >
        <ReusableModal buttonLabel="New User" title="ADD A NEW USER">
          <NewUserForm isNew={true} />
        </ReusableModal>
      </RequestTableHeader>
      <div className="mt-4">
        <UsersTablePage role="role" />
      </div>
    </div>
  );
}

export default Admin;
