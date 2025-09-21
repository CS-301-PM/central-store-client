import "./loginForm.css";
import { useUserContext } from "../../hooks/UserContextHook";
import UsersTablePage from "../Admin/Users";
import NewUserForm from "./NewUserForm";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
import { Link } from "react-router-dom";

export default function UserRegistration() {
  const { user } = useUserContext();

  if (
    user &&
    user.user?.role !== "ADMIN" &&
    user &&
    user.user?.role !== "STORES_MANAGER"
  ) {
    return;
  }
  return (
    <div>
      <RequestTableHeader
        title="Register new user"
        subtitle="Register a new system user."
      >
        <Link to={"/admin/users"}>
          <AppButton variant="contained" color="primary">
            Back to Users
          </AppButton>
        </Link>
      </RequestTableHeader>

      <div className="userRegistartionFormPreview">
        <div className="usersTablePreview mt-4">
          <UsersTablePage role={user?.user?.role} />
        </div>
        <div className="userRegistrationForm">
          <NewUserForm isNew={true} />
        </div>
      </div>
    </div>
  );
}
