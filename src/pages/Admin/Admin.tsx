import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
import UsersTablePage from "./Users";
import { Role } from "../../types/User";
import ReusableModal from "../../components/other/Modal";
// import { useUserContext } from "../../hooks/UserContextHook";
// import { useEffect } from "react";

function Admin({ role }: { role: Role }) {
  return (
    <div className="p-2">
      <RequestTableHeader
        title="Manage all users"
        subtitle="View and manage users."
      >
        <Link to={"/admin/new_user"}>
          <AppButton variant="contained" color="primary">
            New User
          </AppButton>
        </Link>
      </RequestTableHeader>
      <div className="mt-4">
        <UsersTablePage role="role" />
      </div>
    </div>
  );
}

export default Admin;
